const axios = require('axios');
const {Readable} = require('stream');
const {parse} = require('csv-parse');
const connection = require('../db/connection');

const getMeasurements = async (req, res) => {
    try {
        const db = await connection.getConnection();
        const result = await db.collection(req.params.project)
            .find()
            .toArray();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const getLatestMeasurement = async (req, res) => {
    try {
        const db = await connection.getConnection();
        const result = await db.collection(req.params.project)
            .find()
            .sort({'_id': -1})
            .limit(1)
            .toArray();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const addMeasurement = async (req, res) => {
    try {
        const apiKey = req.header(process.env.API_KEY_HEADER);
        const {data: project} = await axios.get(process.env.PROJECTS_URL + '/' + req.params.project);

        if (apiKey === generateAPIKeyForProject(project)) {
            const parametersToValidate = getParametersToValidate(project, req.params.deviceId);
            const errors = validate(parametersToValidate, req.body);

            if (errors.length === 0) {
                const db = await connection.getConnection();
                const newMeasurement = await db.collection(req.params.project).insertOne(req.body);
                res.status(201).json(newMeasurement);
            } else {
                console.log(errors.join());
                res.status(500).json({message: errors.join()});
            }
        } else {
            res.status(401).json({message: 'Invalid API Key!'});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};

const addMeasurementsFromFile = async (req, res) => {
    try {
        const errors = [];
        const documents = [];
        const stream = Readable.from(req.files.file.data);
        const {data: project} = await axios.get(process.env.PROJECTS_URL + '/' + req.params.project);
        const {measurements} = getMeasurementSchema(project, req.params.deviceId);

        stream.pipe(parse({delimiter: '\n'}))
            .on('data', (data) => {
                const row = data[0];
                const measurementValues = row.split(";");

                if (measurementValues.length !== measurements.length) {
                    errors.push('Row does not match measurement schema');
                    return;
                }

                const map = new Map();
                for (let i = 0; i < measurements.length; i++) {
                    map.set(measurements[i].name, parseValue(measurementValues[i]));
                }
                const newMeasurement = Object.fromEntries(map);

                const parametersToValidate = measurements.filter(measurement => measurement.validate === true);
                const measurementErrors = validate(parametersToValidate, newMeasurement);
                if (measurementErrors.length > 0) {
                    console.log(measurementErrors.join());
                    errors.push(measurementErrors.join());
                    return;
                }
                documents.push(newMeasurement);
            })
            .on('error', (error) => errors.push(error));

        if (errors.length === 0) {
            const db = await connection.getConnection();
            const result = await db.collection(req.params.project).insertMany(documents, {ordered: true});
            res.status(201).json({result});
        } else {
            res.status(400).json({message: errors.join()});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const generateAPIKeyForProject = (project) => {
    const {acronym, name} = project;
    const date = new Date();
    return acronym + '.' +
        date.toISOString().split('T')[0] + ' ' + date.getUTCHours() + ':' + date.getMinutes() + '.' +
        name.length;
};

const getMeasurementSchema = (project, deviceId) => {
    const {sensors} = project;
    const {measurementSchema} = sensors.find(sensor => sensor.deviceId === deviceId);
    return measurementSchema;
};

const getParametersToValidate = (project, deviceId) => {
    const {measurements} = getMeasurementSchema(project, deviceId);
    return measurements.filter(measurement => measurement.validate === true);
};

const validate = (measurements, newMeasurement) => {
    const errors = [];
    measurements.forEach(measurement => {
        const parameter = newMeasurement[measurement.name];
        if (parameter !== undefined) {
            if (parameter === measurement.errorValue) {
                errors.push('Error value ' + parameter + ' occurred for ' + measurement.name + ' parameter');
            } else if (parameter < measurement.range.min || parameter > measurement.range.max) {
                errors.push('Value ' + parameter + ' out of range for ' + measurement.name + ' parameter')
            }
        } else {
            errors.push('Could not find parameter with given name: ' + measurement.name);
        }
    });

    return errors;
};

const parseValue = (value) => {
    if (!isNaN(value)) {
        return Number(value);
    } else if (!isNaN(Date.parse(value))) {
        return new Date(value);
    }
    return value;
};

module.exports = {
    getMeasurements,
    getLatestMeasurement,
    addMeasurement,
    addMeasurementsFromFile
};