const connection = require('../db/connection');

const getMeasurements = async (req, res) => {
    try {
        const db = await connection.getConnection();
        const result = await db.collection('test').find().toArray();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const addMeasurement = async (req, res) => {
    try {
        const db = await connection.getConnection();
        const newMeasurement = await db.collection('test').insertOne(req.body);
        res.status(201).json(newMeasurement);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    getMeasurements,
    addMeasurement
};