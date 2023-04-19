const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
    const db = config.get("db");
    mongoose.connect(db).then(() => winston.info(`Connected to MongoDB ${db}...`));
    // set NODE_ENV=test    // to run test
};
