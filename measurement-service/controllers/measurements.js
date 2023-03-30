const axios = require('axios');
const connection = require('../db/connection');

const getMeasurements = async (req, res) => {
    try {
        const db = await connection.getConnection();
        const result = await db.collection(req.params.project).find().toArray();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const addMeasurement = async (req, res) => {
    try {
        const {data:project} = await axios.get(`http://localhost:13401/projects/${req.params.project}`);
        const { sensors } = project;
        const { measurementSchema } = sensors.find(sensor => sensor.deviceId === req.params.deviceId);
        console.log(measurementSchema);

        const db = await connection.getConnection();
        const newMeasurement = await db.collection(req.params.project).insertOne(req.body);
        res.status(201).json(newMeasurement);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    getMeasurements,
    addMeasurement
};