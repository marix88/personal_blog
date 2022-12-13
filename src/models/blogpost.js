import mongoose from "mongoose";
//destructure the Schema and the model from mongoose
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  title: String,
  snippet: String,
  content:  String,
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
