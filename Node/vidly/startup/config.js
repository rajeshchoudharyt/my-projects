const config = require("config");
const winston = require("winston");

module.exports = function () {
    if (!config.get("jwtPrivateKey")) {
        winston.info("FATAL ERROR: jwtPrivateKey is undefined");
        throw new Error("FATAL ERROR: jwtPrivateKey is undefined");
    }
};
