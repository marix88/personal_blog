import express from "express";
import { postAddCategory } from "../controllers/categoryController.js";
import { getCategory } from "../controllers/categoryController.js";
import { patchEditCategory } from "../controllers/categoryController.js";
import { deleteCategory } from "../controllers/categoryController.js";

const routerCategory = express.Router();

// first parameter: which path or URL does it want to listen to

routerCategory.post("/category", postAddCategory);

routerCategory.patch("/", patchEditCategory);

routerCategory.delete("/", deleteCategory);

routerCategory.get(":categoryId", getCategory);

export default routerCategory;
