// 3rd party modules
import express from "express";
import createHttpError from "http-errors";
import path from "path";
import url from "url";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import logger from "morgan";

// Local modules
import router from "./routes/blogRoutes.js";
import routerCategory from "./routes/category.js";
import routerIndex from "./routes/index.js";
import "./mockup.js";

// Server initialization
export const app = express();
const PORT = process.env.PORT;

// Middlewares

// import.meta.url to get the curent file's URL and then convert it to a path
//const __filename = url.fileURLToPath(import.meta.url); // Returns the absolute path to the current file
//const __dirname = path.dirname(__filename); // Returns the absolute path to the parrent folder
//console.log(__filename);
//console.log(__dirname);
//console.log(path.join(__dirname, "about.html"));
//console.log(import.meta.url);

app.use(logger("dev"));
app.use(express.json()); // parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("src/public"));
app.use(cors());

app.set("view engine", "ejs");
app.set("views", "src/views");

// Routes
app.use("/", routerIndex);
app.use("/about", router);
app.use("/create", router);
app.use("/blog", router);
app.use("/category", routerCategory);
app.use("/contact", router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(404));
  console.log("Error 404 here!");
});

// error handler
app.use((error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};
  res.status(error.status || 500);

  // render the error page
  res.render("error");
  console.log("Error!");
  res.end();
});

// Server listen and connection to database
mongoose.connect(`${process.env.MONGODB_URI}`);
app.listen(PORT || "0.0.0.0", (error) => {
  if (!error) console.log("Server running on port" + PORT);
  else console.log("Error! Server can't start");
});