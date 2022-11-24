// 3rd party modules
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Local modules
import router from "./routes/blogRoutes.js";

// Server initialization
export const app = express();
const PORT = process.env.PORT;

// Middlewares
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json()); // parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");

// Routes
app.use("/", router);
app.use("/about", router);

// Server listen and connection to database
mongoose.connect(`${process.env.MONGODB_URI}`);
app.listen(PORT || "0.0.0.0", (error) => {
  if (!error) console.log("Server running on port" + PORT);
  else console.log("Error! Server can't start");
});
