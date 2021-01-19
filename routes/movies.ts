import express from "express";
const router: express.Router = express.Router();
import mongoose from "mongoose";
const { Movie, validateMovie } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");

router.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    const movies: mongoose.Document[] = await Movie.find();
    response.send(movies);
  }
);

router.get(
  "/:id",
  async (request: express.Request, response: express.Response) => {
    try {
      const movie = await Movie.findById(request.params.id);
      response.send(movie);
    } catch (error) {
      response.status(404).send("The movie with the given id doesn't exist.");
    }
  }
);

router.post(
  "/",
  auth,
  async (request: express.Request, response: express.Response) => {
    const { error } = validateMovie(request.body);
    if (error) response.status(400).send(error.details[0].message);
    try {
      const genre = await Genre.findById(request.body.genreId);
      const movies: mongoose.Document = new Movie({
        title: request.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: request.body.numberInStock,
        dailyRentalRate: request.body.dailyRentalRate,
      });
      const movie: mongoose.Document = await movies.save();
      response.send(movie);
    } catch (error) {
      response.status(400).send("Invalid genre id.");
      console.log(error);
    }
  }
);

router.put(
  "/:id",
  async (request: express.Request, response: express.Response) => {
    const { error } = validateMovie(request.body);
    if (error) response.status(400).send(error.details[0].message);
    try {
      const genre = await Genre.findById(request.body.genreId);
      const movie = await Movie.findByIdAndUpdate(
        request.params.id,
        {
          title: request.body.title,
          genre: {
            _id: genre._id,
            name: genre.name,
          },
          numberInStock: request.body.numberInStock,
          dailyRentalRate: request.body.dailyRentalRate,
        },
        { new: true }
      );
      response.send(movie);
    } catch (error) {
      response.status(400).send("The id trying to be updated doesn't exist.");
    }
  }
);

router.delete(
  "/:id",
  async (request: express.Request, response: express.Response) => {
    try {
      const movie = await Movie.findByIdAndRemove(request.params.id);
      response.send(movie);
    } catch (error) {
      response.status(400).send("The id trying to be deleted doesn't exist.");
    }
  }
);

module.exports = router;
