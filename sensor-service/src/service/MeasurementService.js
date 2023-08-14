const {parse} = require("csv-parse");
const MD5 = require("crypto-js/md5");

class MeasurementService {
    constructor(dbManager) {
        this.dbManager = dbManager;
        this.db = null;
    }

    async getMeasurements(acronym) {
        console.log('[INFO] Measurement service: get measurements');
        await this.#checkDbConnection();
        const data = await this.db.collection(acronym).find().toArray();
        const statusCode = 200;
        console.log('[INFO] Measurement service: return measurements');
        return {data: data, statusCode: statusCode};
    }

    async getLatestMeasurements(acronym) {
        console.log('[INFO] Measurement service: get latest measurements');
        await this.#checkDbConnection();
        const sort = {'_id': -1};
        const numberOfMeasurements = 3;
        const data = await this.db.collection(acronym)
            .find()
            .sort(sort)
            .limit(numberOfMeasurements)
            .toArray();
        const statusCode = 200;
        console.log('[INFO] Measurement service: return latest measurements');
        return {
            data: data,
            statusCode: statusCode
        };
    }

    async addMeasurement(apiKey, acronym, deviceId, measurement) {
        console.log('[INFO] Measurement service: add measurement');
        await this.#checkDbConnection();
        let result;
        const project = await this.#getProject(acronym);

        if (project.timeMode === 'OFFLINE') {
            throw new Error('Could not send measurement from sensor to \'offline\' project!');
        }

        if (apiKey === generateAPIKeyForProject(project)) {
            const parametersToValidate = getParametersToValidate(project, deviceId);
            const errors = validate(parametersToValidate, measurement);

            if (errors.length === 0) {
                const newMeasurement = await this.db.collection(acronym).insertOne(measurement);
                result = {data: newMeasurement, statusCode: 201};
            } else {
                result = {data: {message: errors.join()}, statusCode: 500}
            }
        } else {
            result = {data: {message: 'Invalid API Key!'}, statusCode: 401}
        }
        console.log('[INFO] Measurement service: measurement added');
        return result;
    }

    async addMeasurementsFromFile(acronym, deviceId, stream) {
        console.log('[INFO] Measurement service: add measurements from file');
        await this.#checkDbConnection();
        const project = await this.#getProject(acronym);
        const {measurements} = getMeasurementSchema(project, deviceId);
        const documents = await parseFile(stream, acronym, measurements);
        if (documents.length > 0) {
            const newMeasurements = await this.db.collection(acronym)
                    .insertMany(documents, {ordered: true});
            console.log('[INFO] Measurement service: add measurements from file');
            return {data: newMeasurements, statusCode: 201};
        }
        console.log('[INFO] Measurement service: measurements from file haven\'t been added yet');
        return {data: [], statusCode: 202};
    }

    async #getProject(acronym) {
        const projectDocuments = await this.db.collection(process.env.PROJECT_COLLECTION)
            .find({'acronym': acronym})
            .toArray();
        return projectDocuments[0];
    }

    async #checkDbConnection() {
        if (!this.db) {
            this.db = await this.dbManager.getConnection();
        }
    }
}

const generateAPIKeyForProject = (project) => {
    const {acronym, name} = project;
    const date = new Date();
    return MD5(name + '.' + acronym + '.' +
        date.toISOString().split('T')[0] + ' ' + date.getUTCHours() + ':' + date.getMinutes() + '.' +
        name.length).toString();
};

const getMeasurementSchema = (project, deviceId) => {
    const {sensors} = project;
    const {measurementSchema} = sensors.find(sensor => sensor.deviceId === deviceId);
    return measurementSchema;
};

const parseFile = async (stream, acronym, measurements) => {
    return new Promise((resolve, reject) => {
        const documents = [];
        const errors = [];
        stream.pipe(parse({delimiter: '\n'}))
            .on('data', (data) => {
                const row = data.toString();
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
                } else {
                    documents.push(newMeasurement);
                }
            })
            .on('error', (error) => {
                console.log(error.message);
                console.log(errors);
                reject([{data: error.message}]);
            })
            .on('end', async () => {
                resolve(documents);
            })});
}

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

module.exports = MeasurementService;