import mongoose from "mongoose";
//destructure the Schema and the model from mongoose
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  categoryBlogPost: String,
  title: String,
  snippet: String,
  content:  String,
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Blog = model("Blog", blogSchema);
export default Blog;
