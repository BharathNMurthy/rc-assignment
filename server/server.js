const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const routes = require("./routes");
const mongoose = require("mongoose");
const mongoConnection = require("./persistence/monggoseConnection");
const logger = require("./logging/logs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoConnection.create();

app.get("/healthcheck", (req, res) => {
  if (mongoose.connection.readyState) {
    res.status(200).end("I am healthy");
  } else {
    res.status(500).end("I am unhealthy");
  }
});

app.use("/s/api", routes);

app.listen(port, () => {
  return logger.getLogger().info(`Listening on port ${port}`);
});
