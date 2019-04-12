const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const routes = require("./routes");
const mongoConnection = require("./persistence/monggoseConnection");
const logger = require("./logging/logs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoConnection.create();

app.get("/healthcheck", () => {
  logger.getLogger().info(`App is running`);
});

app.use("/s/api", routes);

app.use(express.static(__dirname + "/build"));

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(port, () => {
  logger.getLogger().info(`Listening on port ${port}`);
});
