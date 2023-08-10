const express = require('express');
const Eureka = require('eureka-js-client').Eureka;
const MeasurementController = require('../src/controller/MeasurementController');
const ProjectController = require('../src/controller/ProjectController');

class Server {
    PORT = process.env.APP_PORT || 8000;

    constructor() {
        this.app = express();
        this.client = null;
        this.#addMiddleware();
        this.#attachControllers();
        this.#configureEurekaClient();
    }

    start() {
        return this.app.listen(this.PORT, () => console.log(`Server running on port: http://localhost:${this.PORT}`))
    }

    #addMiddleware() {
        this.app.use(express.json());
    }

    #attachControllers() {
        this.app.use('/projects', ProjectController.router);
        this.app.use('/measurements', MeasurementController.router);
    }

    #configureEurekaClient() {
        this.client = new Eureka({
            instance: {
                app: process.env.APP_NAME,
                hostName: process.env.APP_NAME + ':' + process.env.APP_PORT,
                ipAddr: '127.0.0.1',
                statusPageUrl: 'http://' + process.env.APP_NAME + ':' + process.env.APP_PORT,
                port: {
                    '$': process.env.APP_PORT,
                    '@enabled': true
                },
                vipAddress: process.env.APP_NAME,
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn'
                }
            },
            eureka: {
                host: process.env.EUREKA_SERVER_HOST,
                port: process.env.EUREKA_SERVER_PORT,
                servicePath: '/eureka/apps/',
                maxRetries: 10,
                requestRetryDelay: 2000
            }
        });
        this.client.logger.level('debug');
        this.client.start(function(err) {
            console.log(err || 'complete');
        });
    }
}

module.exports = Server;