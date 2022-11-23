// 3rd party modules
import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Local modules
import blogRoutes from "./routes/blogRoutes";

// Server initialization
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json()); // parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", blogRoutes);

// Server listen and connection to database
mongoose.connect(`${process.env.MONGODB_URI}`);
app.listen(PORT || "0.0.0.0", (error) => {
  if (!error) console.log("Server running on port" + PORT);
  else console.log("Error! Server can't start");
});
