import { io } from "socket.io-client";

const SERVER_URL = "https://health-prediction-and-recommendation-8bqr.onrender.com";

export const socket = io(SERVER_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
