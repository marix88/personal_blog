import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect(`${process.env.MONGODB_URI}`);
app.listen(PORT || "0.0.0.0", (error) => {
  if (!error) console.log("Server running on port" + PORT);
  else console.log("Error! Server can't start");
});
