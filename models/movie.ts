const Joi = require("joi");
import mongoose from "mongoose";
const { genreSchema } = require("../models/genre");

const movieSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number,
});

const Movie: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  "Movie",
  movieSchema
);

interface MovieInt {
  title: string;
  genre: object;
  numberInStock: number;
  dailyRentalRate: number;
}

const validateMovie = (movie: MovieInt) => {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  };
  return Joi.validate(movie, schema);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;
