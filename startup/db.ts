import mongoose from "mongoose";
import winston from "winston";
import config from "config";

module.exports = () => {
  const db: any = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected ${db}...`));
};
