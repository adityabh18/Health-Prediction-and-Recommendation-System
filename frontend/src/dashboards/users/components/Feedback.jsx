import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { authDataContext } from "../../../context/AuthContext";

function Feedback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const [currentUser, setCurrentUser] = useState(null);

  const [userFeedbacks, setUserFeedbacks] = useState([]);

  const [newFeedback, setNewFeedback] = useState("");

  const [rating, setRating] = useState("");

  // ================= FETCH USER =================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/current-user`,

          {
            withCredentials: true,
          },
        );

        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [serverUrl]);

  // ================= SUBMIT =================

  const handleSubmit = async () => {
    if (!newFeedback.trim() || !rating) {
      toast.error("Please enter feedback and rating!");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${serverUrl}/api/feedback/send-feedback`,
        {
          name: currentUser?.name || currentUser?.username || "User",

          email: currentUser?.email,

          feedback: newFeedback,

          rating,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Feedback submitted successfully!");

      setNewFeedback("");
      setRating("");

      navigate("/user-dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-emerald-700">Give Feedback</h2>

      {/* FORM */}

      <div
        className="
          bg-white rounded-3xl shadow-md p-8 flex flex-col gap-6
          border border-emerald-100
          transition duration-300
          hover:shadow-xl hover:-translate-y-1
        "
      >
        {/* TEXTAREA */}

        <div className="flex bg-emerald-50 rounded-2xl px-4 py-4 shadow-sm min-h-[160px]">
          <textarea
            placeholder="Share your feedback about the platform..."
            className="bg-transparent w-full outline-none text-sm resize-none"
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
          />
        </div>

        {/* RATING */}

        <div className="flex items-center bg-emerald-50 rounded-full px-4 py-3 shadow-sm w-44">
          <select
            className="bg-transparent w-full outline-none text-sm"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select Rating</option>

            <option value="★">★</option>

            <option value="★★">★★</option>

            <option value="★★★">★★★</option>

            <option value="★★★★">★★★★</option>

            <option value="★★★★★">★★★★★</option>
          </select>
        </div>

        {/* BUTTON */}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
  px-6 py-3 w-full rounded-full text-white font-medium
  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
  disabled:opacity-70 disabled:cursor-not-allowed
"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>

      {/* FEEDBACK LIST */}

      <div className="flex flex-col gap-4">
        {userFeedbacks.map((fb) => (
          <div
            key={fb.id}
            className="
              bg-white rounded-3xl shadow-md p-5 flex gap-4 items-start
              border border-emerald-100
              transition duration-300
              hover:shadow-xl hover:-translate-y-1
            "
          >
            <img
              src={fb.image}
              alt={fb.name}
              className="w-12 h-12 rounded-full border-2 border-emerald-400"
            />

            <div>
              <p className="font-semibold">{fb.name}</p>

              <p className="text-gray-500 text-sm">{fb.role}</p>

              <p className="italic mt-1">"{fb.text}"</p>

              <p className="text-yellow-500 mt-1">{fb.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
