import bcrypt from "bcrypt";
import _ from "lodash";
import Joi from "joi";
import express from "express";
const router: express.Router = express.Router();
import { UserInt } from "../models/user";
const { User } = require("../models/user");

router.post(
  "/",
  async (request: express.Request, response: express.Response) => {
    const { error } = validate(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    const authUser: UserInt = await User.findOne({
      email: request.body.email,
    });
    if (!authUser)
      return response.status(400).send("Invalid email or password.");

    const validPassword: boolean = await bcrypt.compare(
      request.body.password,
      authUser.password
    );
    if (!validPassword)
      return response.status(400).send("Invalid email or password.");

    const token = authUser.generateAuthToken();
    response.send(token);
  }
);

const validate = (request: UserInt) => {
  const schema = {
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(request, schema);
};

module.exports = router;
