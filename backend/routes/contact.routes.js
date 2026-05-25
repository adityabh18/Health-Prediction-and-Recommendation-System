import express from "express";
import { sendContactMessage } from "../controllers/contact.controllers.js";

const contactRoutes = express.Router();

contactRoutes.post("/send-message", sendContactMessage);

export default contactRoutes;