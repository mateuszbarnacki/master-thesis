const axios = require('axios');
const connection = require('../db/connection');

/*
*
* Should APIKey be encrypted and decrypted?
*
*/

const addMeasurement = async (req, res) => {
    try {
        const apiKey = req.header(process.env.API_KEY_HEADER);
        const {data:project} = await axios.get(`http://localhost:13401/projects/${req.params.project}`);

        if (apiKey === generateAPIKeyForProject(project)) {
            const parametersToValidate = getParametersToValidate(project, req);
            const errors = validate(parametersToValidate, req.body);

            if (errors.length === 0) {
                const db = await connection.getConnection();
                const newMeasurement = await db.collection(req.params.project).insertOne(req.body);
                res.status(201).json(newMeasurement);
            } else {
                console.log(errors.join());
                res.status(400).json({message: errors.join()});
            }
        } else {
            res.status(401).json({message: 'Invalid API Key!'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const generateAPIKeyForProject = (project) => {
    const { acronym, name } = project;
    const date = new Date();
    return acronym + '.' +
        date.toISOString().split('T')[0] + ' ' + date.getHours() + ':' + date.getMinutes() + '.' +
        name.length;
};

const getParametersToValidate = (project, req) => {
    const { sensors } = project;
    const { measurementSchema } = sensors.find(sensor => sensor.deviceId === req.params.deviceId);
    const { measurements } = measurementSchema;
    return measurements.filter(measurement => measurement.validate === true);
};

const validate = (measurements, newMeasurement) => {
    const errors = [];
    measurements.forEach(measurement => {
        const parameter = newMeasurement[measurement.name];
        if (parameter) {
            if (parameter === measurement.errorValue) {
                errors.push('Error value occurred ' + parameter + ' for parameter ' + measurement.name);
            } else if (parameter < measurement.range.min || parameter > measurement.range.max) {
                errors.push('Value out of range ' + parameter + ' for parameter ' + measurement.name + ' ')
            }
        } else {
            errors.push('Could not find parameter with given name: ' + measurement.name);
        }
    });

    return errors;
};

module.exports = {
    addMeasurement
};