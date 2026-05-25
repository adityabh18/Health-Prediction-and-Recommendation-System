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

  const handleTab = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
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
          transform
          transition-transform
          duration-300
          overflow-y-auto
          scrollbar-hide
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button */}
        <div className="flex justify-end md:hidden mb-6">
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-4 flex-1">
          <button
            onClick={() => handleTab("overview")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "overview" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaUser /> Overview
          </button>

          <button
            onClick={() => handleTab("highRisk")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "highRisk" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaNotesMedical /> High Risk Patients
          </button>

          <button
            onClick={() => handleTab("appointments")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "appointments" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaCalendarCheck /> Appointments
          </button>

          <button
            onClick={() => handleTab("patients")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "patients" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaStethoscope /> Patients List
          </button>

          <button
            onClick={() => handleTab("feedback")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "feedback" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaCommentDots /> Feedback
          </button>

          <button
            onClick={() => handleTab("profile")}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 ${
              activeTab === "profile" ? "bg-emerald-200 font-semibold" : ""
            }`}
          >
            <FaUser /> Profile
          </button>
        </div>

        {/* LOGOUT */}
        <div className="mt-auto pt-4 mb-20">
          <button
            onClick={() => navigate("/signin")}
            className="w-full px-6 py-3 rounded-full text-white
    bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
    border border-transparent hover:border-emerald-400
    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <FaSignOutAlt className="inline mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
