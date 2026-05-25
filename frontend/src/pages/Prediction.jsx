import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { FaCalendarCheck } from "react-icons/fa";

function Prediction() {

  const location = useLocation();
  const symptoms = location.state?.symptoms || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      
      <Navbar />

      <div className="py-20 px-4 flex justify-center mt-16">

        <div className="bg-white rounded-3xl shadow-md p-8 max-w-[400px] w-full text-center
        border border-transparent
        hover:border-emerald-400
        hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]
        transition duration-300">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Health Prediction Result
          </h2>

          {/* Selected Symptoms */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm">Selected Symptoms</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {symptoms.map((symptom, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Predicted Disease */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Predicted Disease</p>
            <h3 className="text-xl font-bold text-emerald-600">
              Influenza (Flu)
            </h3>
          </div>

          {/* Confidence */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Confidence</p>
            <h4 className="text-lg font-semibold text-gray-800">
              87%
            </h4>
          </div>

          {/* Recommended Doctor */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm">Recommended Doctor</p>
            <h4 className="font-semibold text-gray-800">
              Dr. Rahul Sharma
            </h4>
            <p className="text-sm text-gray-500">
              Cardiologist
            </p>
          </div>

          {/* Book Appointment Button */}
          <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 w-full">
            <FaCalendarCheck />
            Book Appointment
          </button>

        </div>

      </div>
    </div>
  );
}

export default Prediction;