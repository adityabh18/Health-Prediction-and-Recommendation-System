import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaUserMd,
  FaClinicMedical,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaVenusMars,
  FaRegCalendarAlt,
} from "react-icons/fa";

function EditProfile() {
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    specialization: "",
    experience: "",
    fees: "",
    location: "",
    hospital: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/current-user`,
          { withCredentials: true }
        );

        const data = res.data;

        setFormData({
          username: data.username || "",
          age: data.age || "",
          gender: data.gender || "",
          contact: data.contact || "",
          email: data.email || "",
          specialization: data.specialization || "",
          experience: data.experience || "",
          fees: data.fees || "",
          location: data.location || "",
          hospital: data.hospital || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctor();
  }, [serverUrl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/doctor/update-profile`,
        formData,
        { withCredentials: true }
      );

      navigate("/doctor-dashboard");
    } catch (error) {
      console.log(error);
      alert("Profile update failed");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">

      <div className="max-w-[950px] mx-auto px-4 pt-24 pb-12 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT CARD */}
        <div className="bg-white p-5 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

          <h2 className="text-2xl font-bold text-emerald-700 mb-5">
            Edit Profile
          </h2>

          {/* NAME */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Full Name</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaUser className="text-emerald-600 mr-3" />
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* AGE */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Age</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaRegCalendarAlt className="text-emerald-600 mr-3" />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* GENDER */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Gender</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaVenusMars className="text-emerald-600 mr-3" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          {/* CONTACT */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Contact</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaPhoneAlt className="text-emerald-600 mr-3" />
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-1">
              <FaEnvelope className="text-emerald-600 mr-3" />
              <input
                value={formData.email}
                disabled
                placeholder="Email cannot be changed"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* SPECIALIZATION */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Specialization</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaUserMd className="text-emerald-600 mr-3" />
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. Cardiologist"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Experience</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaClinicMedical className="text-emerald-600 mr-3" />
              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of experience"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* FEES */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Fees</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaMoneyBill className="text-emerald-600 mr-3" />
              <input
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="Consultation fees"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="mb-2.5">
            <label className="text-sm text-gray-600">Location</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaMapMarkerAlt className="text-emerald-600 mr-3" />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Location"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* HOSPITAL */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">Hospital</label>
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
              <FaClinicMedical className="text-emerald-600 mr-3" />
              <input
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Hospital / Clinic name"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSave}
              className="w-[70%] bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white py-3 rounded-full hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Save Profile
            </button>
          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="space-y-4">

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="font-semibold text-lg mb-1">Profile Tips</h3>
            <p className="text-sm text-gray-600">
              Keep your profile updated to improve patient trust and visibility.
            </p>
          </div>

          <div className="bg-emerald-100 p-5 rounded-2xl shadow">
            <h3 className="font-semibold">Important</h3>
            <p className="text-sm text-gray-700 mt-1">
              • Accurate details build trust <br />
              • Update fees regularly <br />
              • Keep contact active
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default EditProfile;