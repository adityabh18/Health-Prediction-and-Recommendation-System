import express from "express"
import isAuth from "../middlewares/isAuth.middlewares.js"
import { currentUser, updateProfile } from "../controllers/user.controllers.js"
import { getHighRiskPatients } from "../controllers/doctor.controllers.js"

const userRoutes=express.Router()

userRoutes.get("/current-user",isAuth,currentUser)

userRoutes.put("/update-profile", isAuth, updateProfile);

userRoutes.get("/high-risk-patients",isAuth,getHighRiskPatients)

export default userRoutes;