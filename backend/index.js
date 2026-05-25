import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dns from "dns";
import http from "http";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import deseaseRoutes from "./routes/disease.predict.routes.js";
import historyRoutes from "./routes/history.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { initSocket } from "./socket/socket.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import contactRoutes from "./routes/contact.routes.js";


dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

/**
 * @description All API
 */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/predict", deseaseRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact",contactRoutes)


const server = http.createServer(app);


initSocket(server);


server.listen(port, () => {
  console.log(`server running on port ${port}`);
  connectDb();
});