import axios from "axios";

const serverUrl = "http://localhost:8000";

export const getMessages = async (appointmentId) => {
  const res = await axios.get(
    `${serverUrl}/api/chat/${appointmentId}`
  );
  return res.data;
};