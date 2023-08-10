const winston = require('winston');

const requestLogger = winston.createLogger({
    format: getRequestLogFormatter(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: getRequestLogFormatter()
        })],
    exitOnError: false
});

requestLogger.exceptions.handle(
    new winston.transports.File( {filename: 'error.log '})
);

function logRequest(req, res, next) {
    requestLogger.info({req, res});
    next();
}

function getRequestLogFormatter() {
    const {combine, timestamp, colorize, printf} = winston.format;

    return combine(
        timestamp(),
        colorize(),
        printf(info => {
            const {req, res} = info.message;
            return `${info.timestamp} ${info.level}: ${req.hostname}${':' + req.socket.address().port || ''}${req.originalUrl}`;
        })
    );
}

module.exports = {
    logRequest
};
