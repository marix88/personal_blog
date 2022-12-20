import express from "express";

import { blog_add_get } from "../controllers/blogController.js";
import { blog_post } from "../controllers/blogController.js";
import { blog_edit_get } from "../controllers/blogController.js";
import { blog_edit_patch } from "../controllers/blogController.js";
import { blog_get } from "../controllers/blogController.js";
import { blog_delete } from "../controllers/blogController.js";

const router = express.Router();

router.get("/create", blog_add_get);
router.post("/create", blog_post);
router.get("/blog/:blogId", blog_get);
router.get("/blog", blog_edit_get);
router.patch("/blog", blog_edit_patch);
router.delete("/blog", blog_delete);
// router.get("/blog/:blogId", blog_add_get);

router.get("/about", (req, res, next) => {
  console.log("About page displayed!");
  res.render("pages/about");
  res.end();
});

export default router;
