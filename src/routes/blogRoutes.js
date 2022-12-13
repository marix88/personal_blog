import express from "express";
const router = express.Router();

import { blog_create_get } from "../controllers/blogController.js";
import { blog_post } from "../controllers/blogController.js";
import { blog_edit_get } from "../controllers/blogController.js";
import { blog_edit_patch } from "../controllers/blogController.js";
import { blog_post_get } from "../controllers/blogController.js";
import { blog_delete } from "../controllers/blogController.js";

router.get("/create", blog_create_get);
router.post("/:blogId", blog_post);
router.get("/create", blog_post_get);
router.get("/blog", blog_edit_get);
router.patch("/blog", blog_edit_patch);
router.delete("/blog", blog_delete);

router.get("/", (req, res, next) => {
  console.log("About page displayed!");
  res.render("about");
});

export default router;
