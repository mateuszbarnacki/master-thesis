const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model('Measurement', measurementSchema);