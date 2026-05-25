import Chat from "../models/chat.models.js";

/**
 * @description getMessages
 */
export const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const messages = await Chat.find({ appointmentId })
      .sort({ createdAt: 1 })
      .populate({
        path: "senderId",
        select: "username email",
        model: "users" 
      });

    res.json(messages);
  } catch (err) {
    console.log("GET MESSAGES ERROR:", err);
    res.status(500).json({
      message: "Error fetching messages",
      error: err.message,
    });
  }
};

/**
 * @description markSeen
 */
export const markSeen = async (req, res) => {
  try {
    const { appointmentId, userId } = req.body;

    await Chat.updateMany(
      {
        appointmentId,
        senderId: { $ne: userId },
      },
      { seen: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      message: "Error updating seen status",
      error: err.message,
    });
  }
};