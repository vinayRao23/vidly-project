import mongoose from "mongoose";
import Joi from "joi";

const customerSchema = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
  isGold: Boolean,
});

const Customer: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  "Customer",
  customerSchema
);

interface Customer {
  name: string;
  phoneNumber: number;
  isGold: boolean;
}

const validateCustomer = (customer: Customer) => {
  const schema = {
    name: Joi.string().min(3).required(),
    phoneNumber: Joi.number().min(5).required(),
    isGold: Joi.boolean().required(),
  };
  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
