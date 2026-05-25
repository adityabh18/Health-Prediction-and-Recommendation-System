import express from "express";
import { getMessages, markSeen } from "../controllers/chat.controllers.js";

const chatRoutes = express.Router();

chatRoutes.get("/:appointmentId", getMessages);
chatRoutes.put("/seen", markSeen);

export default chatRoutes;