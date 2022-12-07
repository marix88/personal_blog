import mongoose from "mongoose";
//destructure the Schema and the model from mongoose
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  title: String,
  description: String,
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
