import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

const userSchema: mongoose.Schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token: string = jwt.sign(
    { _id: this._id, email: this.email, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  "User",
  userSchema
);

export interface UserInt {
  _id: string;
  username: string;
  email: string;
  password: string;
  generateAuthToken: () => void;
}

const validateUser = (user: UserInt) => {
  const schema = {
    username: Joi.string().min(5).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(55).required(),
  };
  return Joi.validate(user, schema);
};

exports.validateUser = validateUser;
exports.User = User;
