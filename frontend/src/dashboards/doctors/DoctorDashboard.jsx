import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "./components/Sidebar";
import HighRiskPatients from "./components/HighRiskPatients";
import Appointments from "./components/Appointments";
import PatientsList from "./components/PatientsList";
import { FaBars } from "react-icons/fa";
import Profile from "./components/Profile";
import DoctorWelcome from "./components/DoctorWelcome";
import Feedback from "./components/FeedBack";

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const doctorProfile = {
    name: "Dr. Raj Sharma",
    specialization: "Cardiologist",
    email: "doctor@example.com",
    image: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="md:hidden p-4 mt-16">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl text-emerald-700"
        >
          <FaBars />
        </button>
      </div>

      <div className="flex relative">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 p-4 md:p-8 mt-4 md:mt-16 md:ml-64 overflow-y-auto">
          {activeTab === "overview" && (
            <DoctorWelcome setActiveTab={setActiveTab} />
          )}

          {activeTab === "highRisk" && <HighRiskPatients />}

          {activeTab === "appointments" && <Appointments />}

          {activeTab === "patients" && <PatientsList />}

          {activeTab === "feedback" && <Feedback />}

          {activeTab === "profile" && <Profile doctorProfile={doctorProfile} />}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
