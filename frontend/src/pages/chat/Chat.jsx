import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../../socket/socket";
import { getMessages } from "../../services/chat.api";
import { userDataContext } from "../../context/UserContext";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

function Chat() {
  const { appointmentId } = useParams();
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  // ================= LOAD MESSAGES =================
  useEffect(() => {
    if (!appointmentId) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(appointmentId);
        setMessages(data || []);
      } catch (err) {
        console.log("Error loading messages:", err);
      }
    };

    fetchMessages();
  }, [appointmentId]);

  // ================= JOIN USER =================
  useEffect(() => {
    if (!userData?._id) return;
    socket.emit("join", userData._id);
  }, [userData]);

  // ================= JOIN ROOM =================
  useEffect(() => {
    if (!appointmentId) return;

    socket.emit("join_room", appointmentId);

    const handleMessage = (msg) => {
      const normalizedMsg = {
        ...msg,
        senderId:
          typeof msg.senderId === "string"
            ? { _id: msg.senderId }
            : msg.senderId,
      };

      setMessages((prev) => [...prev, normalizedMsg]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [appointmentId]);

  // ================= NOTIFICATION (FIXED) =================
  useEffect(() => {
    const handleNotification = (data) => {
  
      if (data.appointmentId === appointmentId) return;

     
      if (data.receiverId && data.receiverId !== userData._id) return;

      toast.info(`New message: ${data.message}`, {
        onClick: () => {
          navigate(`/chat/${data.appointmentId}`);
        },
      });
    };

    socket.on("new_notification", handleNotification);

    return () => {
      socket.off("new_notification", handleNotification);
    };
  }, [appointmentId, userData?._id, navigate]);

  // ================= SEND MESSAGE =================
  const sendMessage = () => {
    if (!text.trim()) return;

    const msgData = {
      appointmentId,

      senderId: {
        _id: userData._id,
        username: userData.username,
      },

      message: text,
    };

    socket.emit("send_message", msgData);
    setText("");
  };

  // ================= AUTO SCROLL =================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex justify-center h-screen bg-gray-50">
      <div className="flex flex-col w-full max-w-2xl lg:max-w-3xl bg-white shadow-md">

        {/* HEADER */}
        <div className="p-4 bg-white shadow flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div className="relative w-10 h-10">
              {userData?.photo ? (
                <img
                  src={userData.photo}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
                  {userData?.username?.charAt(0)?.toUpperCase()}
                </div>
              )}

              <span className="absolute -top-0 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>

            <div>
              <h2 className="font-semibold text-sm">{userData?.username}</h2>
              <p className="text-xs text-gray-500">
                {userData?.role === "doctor" ? "Doctor" : "Patient"}
              </p>
            </div>

          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 hide-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[75%] text-sm shadow ${
                msg.senderId && msg.senderId._id === userData._id
                  ? "bg-emerald-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.message}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-3 bg-white flex items-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white rounded-full px-4 py-2 outline-none shadow-sm focus:shadow-md transition"
          />

          <button
            onClick={sendMessage}
            className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md hover:scale-105 transition"
          >
            <FaPaperPlane />
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat;