import express from "express";
import mongoose from "mongoose";
const router: express.Router = express.Router();
const auth = require("../middleware/auth");
const { Customer, validateCustomer } = require("../models/customer");

const createCustomer = async () => {
  const customer: mongoose.Document = new Customer({
    name: "Vinay Rao",
    phoneNumber: 12345,
    isGold: true,
  });
  try {
    const result: mongoose.Document = await customer.save();
    console.log(result);
  } catch (error) {
    console.log("Something went wrong...", error.message);
  }
};

router.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    const customer: mongoose.Document[] = await Customer.find();
    response.send(customer);
  }
);

router.get(
  "/:id",
  async (request: express.Request, response: express.Response) => {
    try {
      const customer: mongoose.Document | null = await Customer.findById(
        request.params.id
      );
      response.send(customer);
    } catch (error) {
      response.status(404).send("The id being fetched doesn't exist.");
    }
  }
);

router.post(
  "/",
  auth,
  async (request: express.Request, response: express.Response) => {
    const { error } = validateCustomer(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    let customer = new Customer({
      name: request.body.name,
      phoneNumber: request.body.phoneNumber,
      isGold: request.body.isGold,
    });
    customer = await customer.save();
    response.send(customer);
  }
);

router.put(
  "/:id",
  async (request: express.Request, response: express.Response) => {
    try {
      const { error } = validateCustomer(request.body);
      if (error) return response.status(400).send(error.details[0].message);

      const customer: mongoose.Document | null = await Customer.findByIdAndUpdate(
        request.params.id,
        {
          name: request.body.name,
          phoneNumber: request.body.phoneNumber,
          isGold: request.body.isGold,
        },
        { new: true }
      );
      response.send(customer);
    } catch (error) {
      return response
        .status(404)
        .send("The id trying to be updated doesn't exist.");
    }
  }
);

router.delete(
  "/:_id",
  async (request: express.Request, response: express.Response) => {
    try {
      const customer: mongoose.Document | null = await Customer.findByIdAndRemove(
        request.params._id
      );
      response.send(customer);
    } catch (error) {
      return response
        .status(404)
        .send("The id was either already deleted or doesn't exist.");
    }
  }
);

module.exports = router;
