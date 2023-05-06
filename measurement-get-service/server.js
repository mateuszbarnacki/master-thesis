require('dotenv').config();
const express = require('express');
const measurementRouter = require('./routes/measurements');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/results', measurementRouter);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));