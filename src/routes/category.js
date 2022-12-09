import express from "express";
import { getCategory } from "../controllers/categoryController.js";
import { postAddCategory } from "../controllers/categoryController.js";
import { patchEditCategory } from "../controllers/categoryController.js";
import { deleteCategory } from "../controllers/categoryController.js";

const routerCategory = express.Router();

routerCategory.post(
  "/category",
  postAddCategory
);

routerCategory.get("/:categoryId", getCategory);

routerCategory.patch("/", patchEditCategory);

routerCategory.delete("/", deleteCategory);

export default routerCategory;
