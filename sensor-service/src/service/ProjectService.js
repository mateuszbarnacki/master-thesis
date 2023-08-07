const Double = require('mongodb').Double;

class ProjectService {
    constructor(dbManager) {
        this.dbManager = dbManager;
        this.projectCollection = null;
    }

    async getProjectByAcronym(acronym) {
        await this.#checkDbConnection();
        const query = {'acronym': acronym};
        return await this.projectCollection.find(query).toArray();
    }

    async getProjectByName(name) {
        await this.#checkDbConnection();
        const query = {'name': name};
        return await this.projectCollection.find(query).toArray();
    }

    async getProjectsNames() {
        await this.#checkDbConnection();
        const result = await this.projectCollection.find().toArray();
        return result.map(item => item.name);
    }

    async addProject(project) {
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
        return await this.projectCollection.insertOne(project);
    }

    async deleteProject(acronym) {
        await this.#checkDbConnection();
        const query = {'acronym': acronym};
        return await this.projectCollection.deleteOne(query);
    }

    async #checkDbConnection(){
        if (!this.projectCollection) {
            this.projectCollection = await this.dbManager.getProjectCollection();
        }
    }
}

module.exports = ProjectService;