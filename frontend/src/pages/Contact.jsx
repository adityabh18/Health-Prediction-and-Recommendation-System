import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeartbeat,
} from "react-icons/fa";
import { authDataContext } from "../context/AuthContext";

function Contact() {
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Disease Prediction",
    issueType: "AI Prediction Help",
    symptoms: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.name || (!form.email && !form.phone) || !form.symptoms) {
      toast.error("Please fill required fields properly");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${serverUrl}/api/contact/send-message`,
        form,
        { withCredentials: true }
      );

      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "Disease Prediction",
        issueType: "AI Prediction Help",
        symptoms: "",
      });

    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">

      <Navbar />

      <div className="max-w-[950px] w-full mx-auto px-4 pt-24 md:pt-28 pb-12 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* CONTACT FORM (UI SAME) */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-transparent hover:border-emerald-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            Health Support
          </h2>

          <p className="text-gray-500 text-sm mb-5">
            Need help with disease prediction or doctor recommendation?
          </p>

          {/* NAME */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">Patient Name</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
              <FaUser className="text-emerald-600 mr-3" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
              <FaEnvelope className="text-emerald-600 mr-3" />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">Phone</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
              <FaPhoneAlt className="text-emerald-600 mr-3" />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
                placeholder="Mobile number"
              />
            </div>
          </div>

          {/* SERVICE */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">Service Needed</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
              <FaHeartbeat className="text-emerald-600 mr-3" />
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
              >
                <option>Disease Prediction</option>
                <option>Doctor Recommendation</option>
                <option>Health Consultation</option>
                <option>Report Explanation</option>
              </select>
            </div>
          </div>

          {/* ISSUE TYPE */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">Issue Type</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
              <FaHeartbeat className="text-emerald-600 mr-3" />
              <select
                name="issueType"
                value={form.issueType}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
              >
                <option>AI Prediction Help</option>
                <option>Wrong Prediction Report</option>
                <option>Disease Understanding</option>
                <option>General Health Query</option>
                <option>Feedback</option>
              </select>
            </div>
          </div>

          {/* SYMPTOMS */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">
              Symptoms / Health Concern
            </label>
            <div className="bg-emerald-50 rounded-xl p-3 shadow-sm mt-1">
              <textarea
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                rows="3"
                className="w-full bg-transparent outline-none"
                placeholder="Describe your symptoms..."
              />
            </div>
          </div>

          {/* BUTTON (EMAIL SEND LIKE FEEDBACK) */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-full"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </div>

        {/* RIGHT SIDE SAME */}
        <div className="space-y-4">

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Support Center</h3>

            <div className="flex items-center gap-3 text-gray-600 mb-2 text-sm">
              <FaMapMarkerAlt className="text-emerald-600" />
              Jankipuram, Lucknow, Uttar Pradesh
            </div>

            <div className="flex items-center gap-3 text-gray-600 mb-2 text-sm">
              <FaPhoneAlt className="text-emerald-600" />
              +91 8400257717
            </div>

            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <FaEnvelope className="text-emerald-600" />
              support@healthpredict.com
            </div>
          </div>

          <div className="w-full rounded-2xl overflow-hidden shadow">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=jankipuram%20lucknow&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[180px]"
            />
          </div>

          <div className="bg-emerald-100 p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-gray-800">Support Hours</h3>
            <p className="text-gray-600 text-sm mt-1">
              Mon - Sat: 9:00 AM - 6:00 PM
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;