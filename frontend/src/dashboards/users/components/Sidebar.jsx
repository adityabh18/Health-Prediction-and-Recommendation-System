import React from "react";
import {
  FaUser,
  FaNotesMedical,
  FaStethoscope,
  FaCommentDots,
  FaSignOutAlt,
  FaHeartbeat,
  FaCalendarCheck,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
  className={`
    fixed
    top-0 md:top-16
    left-0
    w-64
    h-screen
    bg-white
    shadow-lg
    p-6
    flex
    flex-col
    z-50
    overflow-y-auto
    transform
    transition-transform
    duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>
        {/* Close button (mobile only) */}
        <div className="flex justify-end md:hidden mb-6">
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "profile" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaUser /> Profile
          </button>

          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100"
          >
            <FaHeartbeat /> Check Disease
          </button>

          <button
            onClick={() => setActiveTab("predictionHistory")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "predictionHistory"
                ? "bg-emerald-200 font-semibold"
                : ""
            }`}
          >
            <FaNotesMedical /> Prediction History
          </button>

          <button
            onClick={() => setActiveTab("consultationHistory")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "consultationHistory"
                ? "bg-emerald-200 font-semibold"
                : ""
            }`}
          >
            <FaStethoscope /> Consultation History
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "appointments" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaCalendarCheck /> Appointments
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "feedback" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaCommentDots /> Give Feedback
          </button>
        </div>

        {/* Logout */}
        <button
          className="mt-40 px-6 py-3 rounded-full text-white
          bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 border border-transparent hover:border-emerald-400 
        hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          onClick={() => navigate("/signin")}
        >
          <FaSignOutAlt className="inline mr-2" /> Logout
        </button>
      </div>
    </>
  );
}

export default Sidebar;
