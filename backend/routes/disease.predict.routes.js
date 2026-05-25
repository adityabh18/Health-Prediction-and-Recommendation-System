import express from "express"
import { predictDiabetesDisease, predictGeneralDesease, predictHeartDisease, predictKidneyDisease } from "../controllers/disease.controllers.js";
import isAuth from "../middlewares/isAuth.middlewares.js";


const deseaseRoutes=express.Router();

/**
 * @description routes for general desease prediction based on prompt
 */
deseaseRoutes.post("/general-desease",isAuth,predictGeneralDesease);

/**
 * @description routes for heart desease prediction based on inputs
 */
deseaseRoutes.post("/heart-disease",isAuth,predictHeartDisease)

/**
 * @description routes for diabetes desease prediction based on inputs
 */
deseaseRoutes.post("/diabetes-desease",isAuth,predictDiabetesDisease)

/**
 * @description routes for kideny desease prediction based on inputs
 */
deseaseRoutes.post("/kideny-disease",isAuth,predictKidneyDisease)

export default deseaseRoutes;