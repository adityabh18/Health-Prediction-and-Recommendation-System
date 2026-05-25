import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../../../context/AuthContext";

function Welcome({ setActiveTab }) {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/user/current-user`, {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log("User fetch error:", err);
      }
    };

    fetchUser();
  }, [serverUrl]);

  const cards = [
  {
    title: "Check New Disease",
    desc: "Select your symptoms and get a prediction.",
    btn: "Start Check",
    action: () => navigate("/services"),
  },
  {
    title: "Prediction History",
    desc: "View all your past health predictions.",
    btn: "View",
    action: () => setActiveTab("predictionHistory"),
  },
  {
    title: "Consultation History",
    desc: "See the list of doctors you have consulted with.",
    btn: "View",
    action: () => setActiveTab("consultationHistory"),
  },

  {
    title: "Appointments",
    desc: "Manage your doctor appointments and see their status.",
    btn: "View",
    action: () => setActiveTab("appointments"),
  },

  {
    title: "Give Feedback",
    desc: "Provide feedback to doctors after consultation.",
    btn: "Provide",
    action: () => setActiveTab("feedback"),
  },
];

  return (
    <div
      className="w-full min-h-screen px-4 py-10
      bg-gradient-to-r from-emerald-50 via-white to-emerald-100"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Welcome,{" "}
            <span className="text-emerald-600">{user?.username || "User"}</span>
            !
          </h2>

          <p className="text-gray-500 mt-2 max-w-[650px] mx-auto text-sm md:text-base">
            Start your health journey with AI-powered predictions and smart
            insights.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 text-center
              shadow-md hover:shadow-xl hover:-translate-y-1
              transition duration-300 border border-emerald-200 w-full"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-500 text-xs md:text-sm mt-4 leading-relaxed">
                {item.desc}
              </p>

              {/* Button */}
              <button
                onClick={item.action}
                className="mt-5 px-6 py-3 rounded-full text-white w-full font-medium
                bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
                shadow-md shadow-emerald-200
                hover:shadow-2xl hover:-translate-y-1
                transition-all duration-300"
              >
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
