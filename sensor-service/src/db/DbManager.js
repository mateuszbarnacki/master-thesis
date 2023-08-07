const MongoClient = require('mongodb').MongoClient;
const projectSchema = require('../../resource/ProjectSchema');

class DbManager {
    constructor(url) {
        this.url = url;
        this.mongo = null;
        this.dbConnection = null;
        this.projectCollection = null;
    }

    async #createConnection() {
        const client = new MongoClient(this.url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        this.mongo = await client.connect();
        this.dbConnection = this.mongo.db(process.env.DATABASE);
    }

    async getConnection() {
        if (!this.dbConnection) {
            await this.#createConnection();
        }
        return this.dbConnection;
    }

    async getProjectCollection() {
        if (this.projectCollection) {
            return this.projectCollection;
        }
        if (!this.dbConnection) {
            await this.#createConnection();
        }

        const collections = await this.dbConnection.listCollections().toArray();
        const doesProjectCollectionExist = collections.map(c => c.name)
            .filter(name => name === process.env.PROJECT_COLLECTION).length === 1;

        if (!doesProjectCollectionExist) {
            this.projectCollection = await this.dbConnection.createCollection(process.env.PROJECT_COLLECTION);
            await this.projectCollection.createIndex({acronym: 1}, {unique: true});
            await this.projectCollection.createIndex({name: 1}, {unique: true});
            this.dbConnection.command({
                collMod: process.env.PROJECT_COLLECTION,
                validator: projectSchema.schema
            });
        } else if (!this.projectCollection) {
            this.projectCollection = await this.dbConnection.collection(process.env.PROJECT_COLLECTION);
        }

        return this.projectCollection;
    }

    async closeConnection() {
        await this.mongo.close();
    }
}

module.exports = DbManager;