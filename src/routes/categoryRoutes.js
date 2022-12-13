import express from "express";
import { getCategory } from "../controllers/categoryController.js";
import { postAddCategory } from "../controllers/categoryController.js";
import { patchEditCategory } from "../controllers/categoryController.js";
import { deleteCategory } from "../controllers/categoryController.js";

const routerCategory = express.Router();

routerCategory.post("/:category", postAddCategory);

routerCategory.get("/category", getCategory);

routerCategory.patch("/categories", patchEditCategory);

routerCategory.delete("/categories", deleteCategory);

export default routerCategory;
