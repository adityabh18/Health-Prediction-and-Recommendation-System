import express from "express";

import { sendFeedback } from "../controllers/feedback.controllers.js";

const feedbackRoutes = express.Router();


feedbackRoutes.post("/send-feedback", sendFeedback);

export default feedbackRoutes;