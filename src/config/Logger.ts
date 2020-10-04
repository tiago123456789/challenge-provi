import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { time: Date },
  transports: [
    new winston.transports.File({
      filename: __dirname + '/../../logs/error.log', level: 'error'
    }),
    new winston.transports.File({ 
      filename: __dirname + `/../../logs/${process.env.ENV}.log`, level: 'info'
    })
  ]
});

const isDevelopment = process.env.ENV == "dev";
if (!isDevelopment) {
  logger.add(new winston.transports.Console({ level: 'debug' }));
}



export default logger;