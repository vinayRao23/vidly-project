import jwt from "jsonwebtoken";
import config from "config";
import express from "express";

module.exports = (
  request: any,
  response: express.Response,
  next: express.NextFunction
) => {
  const token: any = request.header("x-auth-token");
  if (!token) response.status(401).send("Access denied. No token provided.");

  try {
    const decoded: string | object = jwt.verify(
      token,
      config.get("jwtPrivateKey")
    );
    request.user = decoded;
    next();
  } catch (exception) {
    response.status(400).send("Invalid token.");
  }
};
