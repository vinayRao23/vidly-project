import express = require("express");

module.exports = (
  handler: (request: express.Request, response: express.Response) => void
) => {
  return async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await handler(request, response);
    } catch (exception) {
      next(exception);
    }
  };
};
