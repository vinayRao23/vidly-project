import express from "express";

module.exports = (
  request: any,
  response: express.Response,
  next: express.NextFunction
) => {
  if (!request.user.isAdmin) return response.status(403).send("Access denied.");

  next();
};
