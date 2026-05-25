// src/pages/UserDashboard.jsx
import React, { useState } from "react";
import { FaUser, FaNotesMedical, FaStethoscope, FaCommentDots, FaSignOutAlt, FaHeartbeat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("welcome");
  const [userFeedbacks, setUserFeedbacks] = useState([]);
const [newFeedback, setNewFeedback] = useState("");    
const [rating, setRating] = useState("");              
  const navigate = useNavigate();

  // Sample user data
  const userProfile = {
    name: "Aditya Rajbhar",
    age: 22,
    gender: "Male",
    contact: "+91 8299431275",
    email: "aditya@example.com",
    image: "https://i.pravatar.cc/150?img=3",
  };

  const predictionsHistory = [
    { id: 1, disease: "Influenza", date: "30-Mar-2026" },
    { id: 2, disease: "Common Cold", date: "28-Mar-2026" },
  ];

  const consultationsHistory = [
    { id: 1, doctor: "Dr. Rahul Sharma", specialty: "Cardiologist", date: "05-Apr-2026" },
    { id: 2, doctor: "Dr. Priya Verma", specialty: "Neurologist", date: "12-Apr-2026" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="flex flex-col md:flex-row mt-16 min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
<div className="w-full md:w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
  <div className="flex flex-col gap-4">
    <button
      onClick={() => setActiveTab("profile")}
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 hover:shadow-md transition-all ${activeTab === "profile" ? "bg-emerald-200 font-semibold shadow" : ""}`}
    >
      <FaUser /> Profile
    </button>

    <button
      onClick={() => navigate("/services")}
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 hover:shadow-md transition-all ${activeTab === "checkDisease" ? "bg-emerald-200 font-semibold shadow" : ""}`}
    >
      <FaHeartbeat /> Check Disease
    </button>

    <button
      onClick={() => setActiveTab("predictionHistory")}
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 hover:shadow-md transition-all ${activeTab === "predictionHistory" ? "bg-emerald-200 font-semibold shadow" : ""}`}
    >
      <FaNotesMedical /> Prediction History
    </button>

    <button
      onClick={() => setActiveTab("consultationHistory")}
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 hover:shadow-md transition-all ${activeTab === "consultationHistory" ? "bg-emerald-200 font-semibold shadow" : ""}`}
    >
      <FaStethoscope /> Consultation History
    </button>

    <button
      onClick={() => setActiveTab("feedback")}
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-100 hover:shadow-md transition-all ${activeTab === "feedback" ? "bg-emerald-200 font-semibold shadow" : ""}`}
    >
      <FaCommentDots /> Give Feedback
    </button>
  </div>

  <button
    className="mt-6 px-7 py-3 rounded-full text-white font-medium
    bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
    shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
    hover:-translate-y-0.5 transition-all duration-300 w-full"
    onClick={() => {
      // logout logic here
      navigate("/login");
    }}
  >
    <FaSignOutAlt className="inline-block mr-2" /> Logout
  </button>
</div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {/* Welcome / Cards */}
          {activeTab === "welcome" && (
            <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome, {userProfile.name}!</h2>
              <p className="text-gray-600 mb-6">Start by checking your health or view your previous records.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-emerald-100 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">Check New Disease</h3>
                  <p>Select your symptoms and get a prediction.</p>
                  <button
                    className="mt-3 md:mt-4 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-emerald-400 text-white hover:bg-emerald-500 transition w-full"
                    onClick={() => navigate("/services")}
                  >
                    Start Check
                  </button>
                </div>

                <div className="bg-emerald-100 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">Prediction History</h3>
                  <p>View all your past health predictions.</p>
                  <button
                    className="mt-3 md:mt-4 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-emerald-400 text-white hover:bg-emerald-500 transition w-full"
                    onClick={() => setActiveTab("predictionHistory")}
                  >
                    View
                  </button>
                </div>

                <div className="bg-emerald-100 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">Consultation History</h3>
                  <p>See the list of doctors you have consulted with.</p>
                  <button
                    className="mt-3 md:mt-4 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-emerald-400 text-white hover:bg-emerald-500 transition w-full"
                    onClick={() => setActiveTab("consultationHistory")}
                  >
                    View
                  </button>
                </div>

                <div className="bg-emerald-100 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">Give Feedback</h3>
                  <p>Provide feedback to doctors after consultation.</p>
                  <button
                    className="mt-3 md:mt-4 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-emerald-400 text-white hover:bg-emerald-500 transition w-full"
                    onClick={() => setActiveTab("feedback")}
                  >
                    Provide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">Profile</h2>
              <img
                src={userProfile.image}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-emerald-400"
              />
              <p><span className="font-semibold">Name:</span> {userProfile.name}</p>
              <p><span className="font-semibold">Age:</span> {userProfile.age}</p>
              <p><span className="font-semibold">Gender:</span> {userProfile.gender}</p>
              <p><span className="font-semibold">Contact:</span> {userProfile.contact}</p>
              <p><span className="font-semibold">Email:</span> {userProfile.email}</p>
              <button
                className="mt-4 px-4 py-2 rounded-full bg-emerald-400 text-white hover:bg-emerald-500 transition"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
          )}

          {/* Prediction History */}
          {activeTab === "predictionHistory" && (
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-6">Prediction History</h2>
              {predictionsHistory.map(pred => (
                <div key={pred.id} className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition">
                  <p><span className="font-semibold">Disease:</span> {pred.disease}</p>
                  <p><span className="font-semibold">Date:</span> {pred.date}</p>
                </div>
              ))}
            </div>
          )}

          {/* Consultation History */}
          {activeTab === "consultationHistory" && (
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-6">Consultation History</h2>
              {consultationsHistory.map(cons => (
                <div key={cons.id} className="bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition">
                  <div>
                    <p><span className="font-semibold">Doctor:</span> {cons.doctor} ({cons.specialty})</p>
                    <p><span className="font-semibold">Date:</span> {cons.date}</p>
                  </div>
                  <button className="mt-2 md:mt-0 px-4 py-2 rounded-full bg-emerald-400 text-white hover:bg-emerald-500 transition">
                    Consult
                  </button>
                </div>
              ))}
            </div>
          )}

{activeTab === "feedback" && (
  <div className="max-w-4xl mx-auto flex flex-col gap-6">
    <h2 className="text-2xl font-bold mb-4">Give Feedback</h2>

  {/* Feedback Form */}
<div className="bg-white rounded-3xl shadow-md p-4 md:p-6 flex flex-col gap-3">
  {/* Feedback Textarea */}
  <div className="flex items-center bg-emerald-50 rounded-full px-3 py-2 shadow-sm">
    <textarea
      placeholder="Share your feedback about the platform..."
      className="bg-transparent w-full outline-none text-sm resize-none"
      value={newFeedback}
      onChange={(e) => setNewFeedback(e.target.value)}
    ></textarea>
  </div>

  {/* Rating Select */}
  <div className="flex items-center bg-emerald-50 rounded-full px-3 py-2 shadow-sm w-32">
    <select
      className="bg-transparent w-full outline-none text-sm"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
    >
      <option value="">Select Rating</option>
      <option value="1">★</option>
      <option value="2">★★</option>
      <option value="3">★★★</option>
      <option value="4">★★★★</option>
      <option value="5">★★★★★</option>
    </select>
  </div>

  {/* Submit Button */}
  <button
    className="flex items-center justify-center gap-1 w-full bg-emerald-600 text-white px-4 py-2 rounded-full shadow hover:bg-emerald-700 transition"
    onClick={() => {
      if (!newFeedback.trim() || !rating) return alert("Please enter feedback and rating!");
      
      const feedbackObj = {
        id: Date.now(),
        name: userProfile.name,
        image: userProfile.image,
        role: "Patient",
        text: newFeedback,
        rating: rating
      };

      setUserFeedbacks([feedbackObj, ...userFeedbacks]);
      setNewFeedback("");
      setRating("");
      alert("Feedback submitted successfully!");
    }}
  >
    Submit Feedback
  </button>
</div>

    {/* Display all feedback */}
    {userFeedbacks.map(fb => (
      <div key={fb.id} className="bg-white rounded-3xl shadow-md p-4 md:p-6 hover:shadow-lg transition flex gap-4 items-start">
        <img src={fb.image} alt={fb.name} className="w-12 h-12 rounded-full border-2 border-emerald-400" />
        <div>
          <p className="font-semibold">{fb.name}</p>
          <p className="text-gray-500 text-sm">{fb.role}</p>
          <p className="italic mt-1">"{fb.text}"</p>
          <p className="text-yellow-500 mt-1">{fb.rating}</p>
        </div>
      </div>
    ))}
  </div>
)}

        </div>
      </div>
    </div>
  );
}

export default UserDashboard;