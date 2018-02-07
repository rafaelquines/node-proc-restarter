var winston = require('winston');
require('winston-daily-rotate-file');
var Utils = require('./utils');
var fs = require('fs');
var cfg = require(process.argv[2])

var logDir = cfg.logs.dir;

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
var logger = new winston.Logger();

logger.add(winston.transports.DailyRotateFile, {
    filename: logDir + '/' + cfg.logs.filename,
    datePattern: 'yyyyMMdd.',
    prepend: true,
    maxFiles: cfg.logs.maxFiles,
    json: false
});

if (!Utils.isRpi()) {
    logger.add(winston.transports.Console, { timestamp: true });
}
module.exports = logger;