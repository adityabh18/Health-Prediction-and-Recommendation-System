import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  FaUserMd,
  FaCalendarCheck,
  FaUsers,
  FaChartBar,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const appointments = [
    { id: 1, patient: "Aditya", disease: "Flu", date: "10 Apr", status: "Pending" },
    { id: 2, patient: "Rohit", disease: "Migraine", date: "11 Apr", status: "Accepted" },
  ];

  const feedbacks = [
    { id: 1, patient: "Aditya", rating: "5 ⭐", comment: "Very helpful doctor." },
    { id: 2, patient: "Rohit", rating: "4 ⭐", comment: "Good consultation." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="flex mt-16">

        {/* Sidebar */}

        <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">

          <div className="flex flex-col gap-4">

            <button
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100"
            >
              <FaChartBar /> Dashboard
            </button>

            <button
              onClick={() => setActiveTab("appointments")}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100"
            >
              <FaCalendarCheck /> Appointments
            </button>

            <button
              onClick={() => setActiveTab("patients")}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100"
            >
              <FaUsers /> Patients
            </button>

            <button
              onClick={() => setActiveTab("feedback")}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100"
            >
              <FaStar /> Feedback
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100"
            >
              <FaUserMd /> Profile
            </button>

          </div>

          <button
            className="mt-6 px-5 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => navigate("/login")}
          >
            <FaSignOutAlt className="inline mr-2" /> Logout
          </button>

        </div>

        {/* Main Section */}

        <div className="flex-1 p-8">

          {/* Dashboard */}

          {activeTab === "dashboard" && (
            <div className="grid grid-cols-4 gap-6">

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold">Total Patients</h3>
                <p className="text-3xl text-emerald-600">120</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold">Total Appointments</h3>
                <p className="text-3xl text-emerald-600">45</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold">Pending</h3>
                <p className="text-3xl text-orange-500">8</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold">Rating</h3>
                <p className="text-3xl text-yellow-500">4.8⭐</p>
              </div>

            </div>
          )}

          {/* Appointments */}

          {activeTab === "appointments" && (
            <div>

              <h2 className="text-2xl font-bold mb-6">Patient Appointments</h2>

              {appointments.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-6 rounded-xl shadow mb-4 flex justify-between"
                >
                  <div>
                    <p><b>Patient:</b> {a.patient}</p>
                    <p><b>Disease:</b> {a.disease}</p>
                    <p><b>Date:</b> {a.date}</p>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-4 py-1 bg-green-500 text-white rounded">
                      Accept
                    </button>
                    <button className="px-4 py-1 bg-red-500 text-white rounded">
                      Reject
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}

          {/* Patients */}

          {activeTab === "patients" && (
            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-xl font-bold mb-4">Patient Predictions</h2>

              <p>Here doctor can see symptoms submitted by patient and predicted disease.</p>

            </div>
          )}

          {/* Feedback */}

          {activeTab === "feedback" && (
            <div>

              <h2 className="text-2xl font-bold mb-6">Patient Feedback</h2>

              {feedbacks.map((f) => (
                <div
                  key={f.id}
                  className="bg-white p-6 rounded-xl shadow mb-4"
                >
                  <p><b>Patient:</b> {f.patient}</p>
                  <p><b>Rating:</b> {f.rating}</p>
                  <p><b>Comment:</b> {f.comment}</p>
                </div>
              ))}

            </div>
          )}

          {/* Profile */}

          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-xl shadow max-w-xl">

              <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>

              <p><b>Name:</b> Dr. Rahul Sharma</p>
              <p><b>Specialization:</b> Cardiologist</p>
              <p><b>Contact:</b> +91 9876543210</p>
              <p><b>Email:</b> doctor@gmail.com</p>
              <p><b>Working Hours:</b> 9 AM - 5 PM</p>

              <button className="mt-4 px-5 py-2 bg-emerald-500 text-white rounded">
                Edit Profile
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default DoctorDashboard;