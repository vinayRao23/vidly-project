import mongoose from "mongoose";
import Joi from "joi";

const genreSchema: mongoose.Schema = new mongoose.Schema({
  name: String,
});

const Genre: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  "Genre",
  genreSchema
);

interface Genre {
  name: string;
}

const validateGenre = (genre: Genre) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
};

exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.genreSchema = genreSchema;
