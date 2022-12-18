import express from "express";
import { postAddCategory } from "../controllers/categoryController.js";
import { getCategory } from "../controllers/categoryController.js";
import { patchEditCategory } from "../controllers/categoryController.js";
import { deleteCategory } from "../controllers/categoryController.js";

const routerCategory = express.Router();

// first parameter: which path or URL does it want to listen to

routerCategory.post("/add-category", postAddCategory);

routerCategory.patch("/category", patchEditCategory);

routerCategory.delete("/category", deleteCategory);

routerCategory.get("/category/:categoryId", getCategory);

export default routerCategory;
