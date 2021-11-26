const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema); // nom Blog pour le pluraliser / deuxieme parametre ou la base se situe
module.exports = Blog;
