import winston from "winston";


const logger = winston.createLogger({
    // level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: 'logs/info.log',
        }),

        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),

        new winston.transports.Console(),
    ]
})

export default logger;