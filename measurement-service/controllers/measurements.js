const Measurement = require('../models/measurement');

const getMeasurements = async (req, res) => {
    try {
        const measurements = await Measurement.find();
        res.json(measurements);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addMeasurement = async (req, res) => {
    const measurement = new Measurement(req.body);

    try {
        const newMeasurement = await measurement.save();
        res.status(201).json(newMeasurement);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    getMeasurements,
    addMeasurement
};