const mongoose = require("mongoose");

const create = () => {
  mongoose.Promise = global.Promise;
  const database = "reynen";
  const mongoUri = "mongodb://localhost:27017";
  const uri = `${mongoUri}/${database}`;

  const mongoOptions = {};
  mongoose.connect(uri, mongoOptions);

  mongoose.connection.on("connected", () => {
    console.log(`Mongoose default connection open to ${uri}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
  });
  mongoose.connection.on("error", err => {
    console.log("Mongoose default connection error");
    console.log(err);
  });
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
};
module.exports = { create };
