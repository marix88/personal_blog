import express from "express";
import { getAddCategory } from "../controllers/categoryController.js";
import { postAddCategory } from "../controllers/categoryController.js";
import { getCategory } from "../controllers/categoryController.js";
import { patchEditCategory } from "../controllers/categoryController.js";
import { deleteCategory } from "../controllers/categoryController.js";

const routerCategory = express.Router();

// first parameter: which path or URL does it want to listen to
routerCategory.get("/add-category", getAddCategory);

routerCategory.post("/add-category/:categoryId", postAddCategory);

routerCategory.get("/category/:categoryId", getCategory);

routerCategory.patch("/category/:categoryId", patchEditCategory);

routerCategory.delete("/category/:categoryId", deleteCategory);

export default routerCategory;
