const axios = require("axios");
const Double = require('mongodb').Double;

class ProjectService {
    constructor(dbManager) {
        this.dbManager = dbManager;
        this.projectCollection = null;
    }

    async getProjectByAcronym(acronym) {
        console.log('[INFO] Project service: get project by acronym');
        await this.#checkDbConnection();
        const query = {'acronym': acronym};
        const result = await this.projectCollection.find(query).toArray();
        console.log('[INFO] Project service: return project by acronym');
        return result;
    }

    async getProjectByName(name) {
        console.log('[INFO] Project service: get project by name');
        await this.#checkDbConnection();
        const query = {'name': name};
        const result = await this.projectCollection.find(query).toArray()
        console.log('[INFO] Project service: return project by name');
        return result;
    }

    async getProjectsNames() {
        console.log('[INFO] Project service: get project names');
        await this.#checkDbConnection();
        const result = await this.projectCollection.find().toArray();
        console.log('[INFO] Project service: return project names');
        return result.map(item => item.name);
    }

    async addProject(project) {
        console.log('[INFO] Project service: add project');
        await this.#checkDbConnection();
        project.sensors.map(sensor => {
            if (sensor.longitude) {
                sensor.longitude = new Double(sensor.longitude);
            }
            if (sensor.latitude) {
                sensor.latitude = new Double(sensor.latitude);
            }
            if (sensor.altitude) {
                sensor.altitude = new Double(sensor.altitude);
            }
            sensor.measurementSchema.measurements.map(measurement => {
                measurement.range.min = new Double(measurement.range.min);
                measurement.range.max = new Double(measurement.range.max);
                return measurement;
            });
            return sensor;
        });
        const result = await this.projectCollection.insertOne(project);
        console.log('[INFO] Project service: project added');
        return result;
    }

    async deleteProject(name) {
        console.log('[INFO] Project service: delete project');
        await this.#checkDbConnection();
        const query = {'name': name};
        const result = await this.projectCollection.deleteOne(query);
        console.log('[INFO] Project service: project deleted');
        const deleted = await axios.delete(process.env.AUTH_SERVICE_PROJECTS + name);
        console.log('[INFO] Project service: user projects deleted');
        return result;
    }

    async #checkDbConnection() {
        if (!this.projectCollection) {
            this.projectCollection = await this.dbManager.getProjectCollection();
        }
    }
}

module.exports = ProjectService;