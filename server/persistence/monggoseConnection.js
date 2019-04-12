const mongoose = require("mongoose");
const logger = require("../logging/logs");

const create = () => {
  mongoose.Promise = global.Promise;
  const database = "reynen";
  const mongoUri = "mongodb://mongo:27017";
  const uri = `${mongoUri}/${database}`;

  const mongoOptions = {};
  mongoose.connect(uri, mongoOptions);

  mongoose.connection.on("connected", () => {
    logger.getLogger().info(`Mongoose default connection open to ${uri}`);
  });

  mongoose.connection.on("disconnected", () => {
    logger.getLogger().info("Mongoose default connection disconnected");
  });
  mongoose.connection.on("error", err => {
    logger.getLogger().error("Mongoose default connection error");
    logger.getLogger().error(err);
  });
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      logger
        .getLogger()
        .info(
          "Mongoose default connection disconnected through app termination"
        );
      process.exit(0);
    });
  });
};
module.exports = { create };
