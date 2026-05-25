import express from "express";
import isAuth from "../middlewares/isAuth.middlewares.js";
import { getPredictionHistory } from "../controllers/history.controllers.js";

const historyRoutes = express.Router();

historyRoutes.get("/get-history",isAuth,getPredictionHistory);

export default historyRoutes;