const express = require('express');
const {Readable} = require('stream');
const fileUpload = require('express-fileupload');
const fileExtensionLimiter = require('../middleware/FileExtensionLimiter');
const filePayloadExists = require('../middleware/FilePayloadExists');
const DbManager = require('../db/DbManager');
const MeasurementService = require('../service/MeasurementService');

const measurementService = new MeasurementService(new DbManager(process.env.DATABASE_URL));

class MeasurementController {
    constructor() {
        this.router = express.Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get('/:acronym', this.getMeasurements);
        this.router.get('/:acronym/latest', this.getLatestMeasurement);
        this.router.post('/:acronym/:deviceId', this.addMeasurement);
        this.router.post('/upload/:acronym/:deviceId',
            fileUpload({ createParentPath: true }),
            filePayloadExists,
            fileExtensionLimiter(['.csv']),
            this.addMeasurementsFromFile);
    }

    async getMeasurements(req, res) {
        try {
            const acronym = req.params.acronym;
            const result = await measurementService.getMeasurements(acronym);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async getLatestMeasurement(req, res) {
        try {
            const acronym = req.params.acronym;
            const result = await measurementService.getLatestMeasurements(acronym);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    async addMeasurement(req, res) {
        try {
            const apiKey = req.header(process.env.API_KEY_HEADER);
            const acronym = req.params.acronym;
            const deviceId = req.params.deviceId;
            const measurement = req.body;
            const result = await measurementService.addMeasurement(apiKey, acronym, deviceId, measurement);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async addMeasurementsFromFile(req, res) {
        try {
            const acronym = req.params.acronym;
            const deviceId = req.params.deviceId;
            const stream = Readable.from(req.files.file.data);
            const result = await measurementService.addMeasurementsFromFile(acronym, deviceId, stream);
            return res.status(result.statusCode).send(result.data);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new MeasurementController();