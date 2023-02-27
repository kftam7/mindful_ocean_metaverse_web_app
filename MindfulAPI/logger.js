const moment = require('moment');
const config = require("./config");
const winston = require("winston");
const { format, level, prettyPrint } = require('winston');
const DailyRotateFile = require("winston-daily-rotate-file");

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Hong_Kong'
    });
}

const logFormat = winston.format.combine(
 //winston.format.colorize(),
 winston.format.timestamp(),
 winston.format.align(),
 winston.format.splat(),
 winston.format.printf(
  //info => `${info.timestamp} ${info.level}: ${info.message}`,
  info => moment(info.timestamp).utc().utcOffset("+0800").format("YYYY-MM-DD HH:mm:ss") + ' ' + info.level + info.message
),);

const transport = new DailyRotateFile({
 filename: config.logConfig.logFolder + config.logConfig.logFile,
 datePattern: 'YYYY-MM-DD',
 zippedArchive: true,
 maxSize: '20m',
 maxFiles: '14d',
 prepend: true,
});
transport.on('rotate', function (oldFilename, newFilename) {
// call function like upload to s3 or on cloud
});

const logger = winston.createLogger({
//format:format.combine(format.timestamp({ format: timezoned })),
format: logFormat,
transports: [
     transport,
     //new winston.transports.Console({
     //      level: "error",}),
]});
module.exports = logger;
