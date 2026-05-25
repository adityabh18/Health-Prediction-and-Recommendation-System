import express from "express";
import isAuth from "../middlewares/isAuth.middlewares.js";

import {
  bookAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getUserConsultations,
} from "../controllers/appointment.controllers.js";

const appointmentRoutes = express.Router();

appointmentRoutes.post("/book", isAuth, bookAppointment);

appointmentRoutes.get("/user", isAuth, getUserAppointments);

appointmentRoutes.get("/doctor", isAuth, getDoctorAppointments);

appointmentRoutes.put("/update-status/:id", isAuth, updateAppointmentStatus);

appointmentRoutes.get("/user-consultations", isAuth, getUserConsultations);

export default appointmentRoutes;
