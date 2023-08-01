const express = require('express');
const MeasurementController = require('../src/controller/MeasurementController');
const ProjectController = require('../src/controller/ProjectController');

class Server {
    PORT = process.env.PORT || 8000;

    constructor() {
        this.app = express();
        this.addMiddleware();
        this.attachControllers();
    }

    start() {
        return this.app.listen(this.PORT, () => console.log(`Server running on port: http://localhost:${this.PORT}`))
    }

    addMiddleware() {
        this.app.use(express.json());
    }

    attachControllers() {
        this.app.use('/projects', ProjectController.router);
        this.app.use('/measurements', MeasurementController.router);
    }
}

module.exports = Server;