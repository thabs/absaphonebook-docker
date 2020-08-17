const logger = require("../services/logger");
const mongoose = require("mongoose");

// Options to pass to mongodb to avoid deprecation warnings
const options = {
  useNewUrlParser: true,
  user: process.env.MONGO_DB_USERNAME,
  pass: process.env.MONGO_DB_PASSWORD,
};
mongoose.connect(process.env.MONGO_DB_URL, options);

/* Connecting to MongoDB with URI
// Options to pass to mongodb to avoid deprecation warnings
const options = {
  useNewUrlParser: true,
};

mongoose.connect(process.env.MONGO_DB_URI, options);
*/

// CONNECTION EVENTS
mongoose.connection.on("connected", function () {
  logger.info("Mongoose connected to Phonebook database");
});

mongoose.connection.on("error", function (err) {
  logger.error("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  logger.info("Mongoose disconnected");
});

// BRING IN YOUR SCHEMAS & MODELS
require("./profile");
