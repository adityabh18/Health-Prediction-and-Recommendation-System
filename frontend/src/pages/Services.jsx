import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import { FaStethoscope, FaHeartbeat, FaArrowLeft } from "react-icons/fa";
import { GiKidneys } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";

const services = [
  {
    tag: "FREE",
    title: "General Symptom Checker",
    desc: "Fever, Cold, Skin Issues & 40+ diseases",
    icon: <FaStethoscope />,
    route: "/symptom-checker",
  },
  {
    tag: "PAID ₹30",
    title: "Heart Risk Analyzer",
    desc: "BMI, BP, Lifestyle-based risk analysis",
    icon: <FaHeartbeat />,
    route: "/heart-risk",
  },
  {
    tag: "PAID ₹30",
    title: "Diabetes Predictor",
    desc: "Blood Sugar, Cholesterol & age factors",
    icon: <MdBloodtype />,
    route: "/diabetes",
  },
  {
    tag: "PAID ₹30",
    title: "Kidney Health Scan",
    desc: "Lab values — creatinine, albumin & more",
    icon: <GiKidneys />,
    route: "/kidney",
  },
];

function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200 overflow-x-hidden">

      <Navbar />

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="
          fixed top-20 left-4 z-50
          bg-white shadow-md border border-emerald-200
          p-3 rounded-full
          text-emerald-600
          hover:shadow-lg hover:-translate-y-1
          transition-all duration-300
        "
      >
        <FaArrowLeft />
      </button>

      <div className="py-16 px-4">

        {/* Heading */}
        <div className="text-center mb-12 mt-10">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700">
            Our Services
          </h1>

          <p className="text-gray-600 mt-2">
            Diagnosis se treatment tak ka complete healthcare ecosystem
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex justify-center text-emerald-600 text-3xl mb-3">
                {service.icon}
              </div>

              <div className="flex justify-center mb-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold
                  ${
                    service.tag === "FREE"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {service.tag}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h2>

              <p className="text-sm text-gray-500 mb-6 flex-grow">
                {service.desc}
              </p>

              <button
                onClick={() => navigate(service.route)}
                className="mt-auto px-7 py-3 rounded-full text-white font-medium
                bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
                shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
                hover:-translate-y-0.5 transition-all duration-300 w-full"
              >
                Predict
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Services;