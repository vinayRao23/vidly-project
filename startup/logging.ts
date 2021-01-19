const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

module.exports = () => {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (exception: Error) => {
    throw exception;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: "mongodb://localhost/vidlydb",
  //     level: "info",
  //   })
  // );
};
