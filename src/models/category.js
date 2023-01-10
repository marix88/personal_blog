import mongoose from "mongoose";
//destructure the Schema and the model from mongoose
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  titleCategory: String,
  description: String,
});

const Category = model("Category", categorySchema);
export default Category;
