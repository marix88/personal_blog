import express from "express";
//import { app } from "../app";
const router = express.Router();
export default router;

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
  console.log("Index page displayed!");
  res.end();
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "About" });
  console.log("About page displayed!");
  res.end();
});

router.get("/create", (req, res, next) => {
  res.render("create", { title: "Create new blog post" });
  console.log("Create page displayed!");
  res.end();
});

router.get("/contact", (req, res, next) => {
  res.render("contact", { title: "Contact" });
  console.log("Contact page is displayed!");
  res.end();
});
