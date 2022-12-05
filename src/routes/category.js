import express from "express";
import upload from "../middlewares/upload.js";
import { getCategory } from "../controllers/categoryController.js";
import { postAddCategory } from "../controllers/categoryController.js";
import { patchEditCategory } from "../controllers/categoryController.js";
import { deleteCategory } from "../controllers/categoryController.js";

const routerCategory = express.Router();

routerCategory.get("/:categoryId", getCategory);

routerCategory.post("/add-category", upload.single("img"), postAddCategory);

routerCategory.patch("/", upload.single("img"), patchEditCategory);

routerCategory.delete("/", deleteCategory);

export default routerCategory;
