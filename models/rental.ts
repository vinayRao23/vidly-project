import Joi from "joi";
import mongoose from "mongoose";

const customerSchema: mongoose.Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  isGold: {
    type: Boolean,
    default: false,
  },
  phoneNumber: Number,
});

const movieSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  dailyRentalRate: Number,
});

const rentalSchema: mongoose.Schema = new mongoose.Schema({
  customer: customerSchema,
  movie: movieSchema,
  dateOut: {
    type: Date,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
    default: Date.now,
  },
  rentalFee: {
    default: 100,
    type: Number,
  },
});

const Rental: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  "Rental",
  rentalSchema
);

interface RentalInt {
  customerId: string;
  movieId: string;
}

const validateRental = (rental: RentalInt) => {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };
  return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validateRental = validateRental;
