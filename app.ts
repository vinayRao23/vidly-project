import express from "express";
const app: express.Application = express();
require("./startup/routes")(app);
module.exports = app;
