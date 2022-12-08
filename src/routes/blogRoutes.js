import express from "express";
const router = express.Router();
import path from "path";
import fs from "fs";


import { blog_create_get } from "../controllers/blogController.js";
import { blog_post } from "../controllers/blogController.js";
import { blog_edit_get } from "../controllers/blogController.js";
import { blog_edit_patch } from "../controllers/blogController.js";
import { blog_post_get } from "../controllers/blogController.js";
import { blog_delete } from "../controllers/blogController.js";

router.get("/create", blog_create_get);
router.post("/create", blog_post);
router.get("/:blogId", blog_post_get);
router.get("/edit-post", blog_edit_get);
router.patch("/edit-post", blog_edit_patch);
router.delete("/", blog_delete);

router.get("/about", (req, res) => {
  console.log("About page displayed!");
  res.render("about", {
    title: "About",
    titleAllCategories: ["caine", "pisica", "soarece"],
  });
});

export default router;
