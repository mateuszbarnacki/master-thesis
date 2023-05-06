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

module.exports = {
    getMeasurements
}