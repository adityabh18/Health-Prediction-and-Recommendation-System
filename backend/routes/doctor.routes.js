import express from "express";
import {
    getAllDoctors,
  getDoctorDashboardStats,
  getDoctorPatients,
  updateProfile,
} from "../controllers/doctor.controllers.js";
import isAuth from "../middlewares/isAuth.middlewares.js";

const doctorRoutes = express.Router();

doctorRoutes.put("/update-profile", isAuth, updateProfile);

doctorRoutes.get("/dashboard-stats", isAuth, getDoctorDashboardStats);

doctorRoutes.get("/all-doctors",isAuth, getAllDoctors);

doctorRoutes.get("/patients",isAuth,getDoctorPatients)

export default doctorRoutes;
