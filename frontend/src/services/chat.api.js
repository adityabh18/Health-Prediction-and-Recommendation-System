import axios from "axios";

const serverUrl = "https://health-prediction-and-recommendation-8bqr.onrender.com";

export const getMessages = async (appointmentId) => {
  const res = await axios.get(
    `${serverUrl}/api/chat/${appointmentId}`
  );
  return res.data;
};
