import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import PredictionHistory from "./components/PredictionHistory";
import ConsultationHistory from "./components/ConsultationHistory";
import Feedback from "./components/Feedback";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Appointments from "./components/Appointments";

function UserDashboard() {

  const location = useLocation();

const [activeTab, setActiveTab] = useState(
  location.state?.tab || "welcome"
);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const userProfile = {
    name: "Aditya Rajbhar",
    age: 22,
    gender: "Male",
    contact: "+91 8299431275",
    email: "aditya@example.com",
    image: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">

      <Navbar />

      {/* Mobile Hamburger */}
      <div className="md:hidden p-4 mt-16">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl text-emerald-700"
        >
          <FaBars />
        </button>
      </div>

      <div className="flex relative">

        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Dashboard Content */}
        <div className="flex-1 p-4 md:p-8 mt-4 md:mt-16 md:ml-64 overflow-y-auto">

          {activeTab === "welcome" && <Welcome setActiveTab={setActiveTab} />}

          {activeTab === "profile" && <Profile userProfile={userProfile} />}

          {activeTab === "predictionHistory" && <PredictionHistory />}

          {activeTab === "consultationHistory" && <ConsultationHistory />}

          {activeTab === "appointments" && <Appointments />}

          {activeTab === "feedback" && (
            <Feedback userProfile={userProfile} />
          )}

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;