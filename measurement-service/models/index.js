require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.once('open', () => {
   console.log('Connected to Database');
});

db.on('error', (error) => {
    console.error(error);
    mongoose.disconnect();
});

module.exports = db;