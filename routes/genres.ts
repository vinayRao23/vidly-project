const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
import mongoose from "mongoose";
import express from "express";
const router: express.Router = express.Router();
const { Genre, validateGenre } = require("../models/genre");

const createGenre = async () => {
  const genre: mongoose.Document = new Genre({ name: "thriller", id: 1 });
  try {
    const result: mongoose.Document = await genre.save();
    console.log(result);
  } catch (error) {
    console.log("Something went wrong...", error);
  }
};

router.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    // throw new Error("Could not get the genres.");
    const genres: mongoose.Document[] = await Genre.find();
    response.send(genres);
  }
);

router.post(
  "/",
  auth,
  async (request: express.Request, response: express.Response) => {
    const { error } = validateGenre(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    let genre: mongoose.Document = new Genre({
      name: request.body.name,
    });
    genre = await genre.save();
    response.send(genre);
  }
);

router.put(
  "/:id",
  async (request: express.Request, response: express.Response) => {
    try {
      const { error } = validateGenre(request.body);
      if (error) return response.status(400).send(error.details[0].message);

      const genre: mongoose.Document | null = await Genre.findByIdAndUpdate(
        request.params.id,
        { name: request.body.name },
        { new: true }
      );
      response.send(genre);
    } catch (error) {
      response.status(404).send("The id trying to be updated doesn't exist.");
    }
  }
);

router.delete(
  "/:_id",
  [auth, admin],
  async (request: express.Request, response: express.Response) => {
    try {
      const genre: mongoose.Document | null = await Genre.findByIdAndRemove(
        request.params._id
      );
      response.send(genre);
    } catch (error) {
      response
        .status(404)
        .send("The id was either already deleted or doesn't exist.");
    }
  }
);

router.get(
  "/:id",
  async (request: express.Request, response: express.Response) => {
    try {
      const genre: mongoose.Document | null = await Genre.findById(
        request.params.id
      );
      response.send(genre);
    } catch (error) {
      response.status(404).send("The id trying to be fetched doesn't exist.");
    }
  }
);

module.exports = router;
