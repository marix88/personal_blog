import mongoose from "mongoose";
//destructure the Schema and the model from mongoose
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: String,
  content: {
    type: String,
    required: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: Date,
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
