import { Server } from "socket.io";
import Chat from "../models/chat.models.js";
import Appointment from "../models/appointment.models.js";

const userSocketMap = new Map();

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      userSocketMap.set(userId, socket.id);
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    });


    socket.on("join_room", (appointmentId) => {
      socket.join(appointmentId);
    });


    socket.on("send_message", async (data) => {
  try {
    const msg = await Chat.create(data);

    io.to(data.appointmentId).emit("receive_message", msg);

    const appointment = await Appointment.findById(data.appointmentId);

    const receiverIds = [
      appointment.doctorId.toString(),
      appointment.patientId.toString(),
    ];

    receiverIds.forEach((userId) => {
      const socketId = userSocketMap.get(userId);

      if (socketId) {
        io.to(socketId).emit("new_notification", {
          appointmentId: data.appointmentId,
          senderName: data.senderId?.username,
          message: data.message,
        });
      }
    });

  } catch (err) {
    console.log(err.message);
  }
});
    socket.on("disconnect", () => {
      for (let [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    });
  });

  return io;
};
