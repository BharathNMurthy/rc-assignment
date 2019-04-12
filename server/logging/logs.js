const winston = require("winston");
const tsFormat = () => new Date().toLocaleTimeString();
let loggerInstance;

class Logger {
  getLogger() {
    if (!loggerInstance) {
      const logLevel = "info";
      loggerInstance = winston.createLogger({
        transports: [
          new winston.transports.Console({
            json: true,
            stringify: obj => JSON.stringify(obj),
            timestamp: tsFormat,
            colorize: true,
            level: `${logLevel}`
          })
        ],
        exitOnError: false // do not exit on handled exceptions
      });
    }
    return loggerInstance;
  }
}

module.exports = new Logger();
