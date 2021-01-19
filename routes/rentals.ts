import express from "express";
const router: express.Router = express.Router();
import mongoose from "mongoose";
const Fawn = require("fawn");
const { Rental, validateRental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");

Fawn.init(mongoose);

router.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    const rentals: mongoose.Document = await Rental.find();
    response.send(rentals);
  }
);

router.post(
  "/",
  auth,
  async (request: express.Request, response: express.Response) => {
    try {
      const obj = validateRental(request.body);
      if (obj.error) response.status(400).send(obj.error.details[0].message);

      const customer = await Customer.findById(request.body.customerId);
      const movie = await Movie.findById(request.body.movieId);

      if (movie.numberInStock === 0)
        response
          .status(400)
          .send("The movie you are looking for is out of stock.");

      let rental: mongoose.Document = new Rental({
        customer: {
          _id: customer._id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
      });

      try {
        new Fawn.Task()
          .save("rentals", rental)
          .update(
            "movies",
            { _id: movie._id },
            {
              $inc: { numberInStock: -1 },
            }
          )
          .run();

        response.send(rental);
      } catch (exception) {
        response.status(500).send("Something failed.");
      }
    } catch (error) {
      response.status(400).send("Invalid customer or movie id.");
    }
  }
);

module.exports = router;
