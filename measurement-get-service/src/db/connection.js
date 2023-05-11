const MongoClient = require('mongodb').MongoClient;

let dbConnection;

const createConnection = async () => {
    const url = process.env.DATABASE_URL;
    const client = new MongoClient(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    const mongo = await client.connect();
    dbConnection = mongo.db(process.env.DATABASE);
};

const getConnection = async () => {
    if (!dbConnection) {
        await createConnection();
    }
    return dbConnection;
};

module.exports = {
    createConnection,
    getConnection
};