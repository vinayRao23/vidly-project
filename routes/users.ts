import bcrypt from "bcrypt";
import _ from "lodash";
import express from "express";
const router: express.Router = express.Router();
import mongoose from "mongoose";
import { UserInt } from "../models/user";
const { validateUser, User } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/me", auth, async (request: any, response: express.Response) => {
  const user: mongoose.Document = await User.findById(request.user._id).select(
    "-password"
  );
  response.send(user);
});

router.post(
  "/",
  async (request: express.Request, response: express.Response) => {
    const { error } = validateUser(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    let duplicationUser: UserInt = await User.findOne({
      email: request.body.email,
    });
    if (duplicationUser)
      return response.status(400).send("User already registered.");

    const user = new User(
      _.pick(request.body, ["username", "email", "password"])
    );

    const salt: string = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    response
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "username", "email"]));
  }
);

module.exports = router;
