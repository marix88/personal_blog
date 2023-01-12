import express from "express";

import { blog_add_get } from "../controllers/blogController.js";
import { blog_post } from "../controllers/blogController.js";
import { blog_get } from "../controllers/blogController.js";
import { blog_edit_get } from "../controllers/blogController.js";
import { blog_edit_patch } from "../controllers/blogController.js";
import { blog_delete } from "../controllers/blogController.js";
import { blogs_get } from "../controllers/blogController.js";

const router = express.Router();

router.get("/create", blog_add_get);
router.post("/create", blog_post);
router.get("/blog/:blogId", blog_get);
router.get("/blog/:blogId", blog_edit_get);
router.patch("/blog/:blogId", blog_edit_patch);
router.delete("/blog/:blogId", blog_delete);
router.get("/blog", blogs_get);
router.get("/about", (req, res, next) => {
  console.log("About page displayed!");
  res.render("pages/about");
  res.end();
});

export default router;
