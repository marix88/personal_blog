import express from "express";
const routerIndex = express.Router();

import { getHomePage } from "../controllers/indexController.js";
routerIndex.get("/", getHomePage);


export default routerIndex;
