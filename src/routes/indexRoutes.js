import express from "express";

import { getHomePage } from "../controllers/indexController.js";
const routerIndex = express.Router();

routerIndex.get("/", getHomePage);

export default routerIndex;
