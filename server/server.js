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

app.get("/healthcheck", () => {
  logger.getLogger().info(`App is running`);
});

app.use("/s/api", routes);
app.use("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
app.use(express.static(__dirname + "/build"));


app.listen(port, () => {
  return logger.getLogger().info(`Listening on port ${port}`);
});
