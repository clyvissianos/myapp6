const { format, transports, createLogger } = require("winston");
require("winston-daily-rotate-file");
require("winston-mongodb");
require("dotenv").config();

// const logger = winston.createLogger({
//     level: "debug",
//     format: winston.format.json(),
//     transports: [new winston.transports.Console()]
// })

const { combine, timestamp, label, printf, prettyPrint } = format;

const CATEGORY = "winston custon format";

// const customFormat = printf(
//     ({ level, message, label, timestamp}) => {
//         return `${timestamp} [${label}], ${level}: ${message}`;
//     }
// )

const fileRotateTransport = new transports.DailyRotateFile({
  // level: "error"
  filename: "logs/rotate-%Date%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d",
});

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    fileRotateTransport,
    new transports.File({
      filename: "logs/example.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
    new transports.Console(),
    new transports.MongoDB({
      level: "error",
      db: process.env.MONGODB_URI,
      options: {
        useUnifiedTopology: true,
      },
      collections: "server_logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

// const logger = winston.createLogger({
//     level: "debug",
//     format: winston.format.json(),
//     transports: [
//         new transports.File({
//             filename: "logs/error.log"
//         })
//     ]
// })

module.exports = logger;
