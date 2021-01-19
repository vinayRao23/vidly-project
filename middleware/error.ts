import express from "express";
import winston from "winston";

module.exports = (
  error: Error,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  winston.error(error.message, error);
  response.status(500).send("Something failed.");
};
