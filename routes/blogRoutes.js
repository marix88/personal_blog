import express from "express";
//import { app } from "../app";
const router = express.Router();
export default router;

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
  console.log("Index page displayed!");
  next();
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "About" });
  console.log("About page displayed!");
  next();
});
