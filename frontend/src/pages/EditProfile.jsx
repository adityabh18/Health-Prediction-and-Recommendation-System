import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaUser, FaEnvelope, FaPhoneAlt, FaBirthdayCake, FaVenusMars, FaSave } from "react-icons/fa";

function EditProfile() {
  const [profile, setProfile] = useState({
    name: "Aditya Rajbhar",
    age: 22,
    gender: "Male",
    contact: "+91 8299431275",
    email: "aditya@example.com",
    image: "https://via.placeholder.com/100",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="flex justify-center pt-24 md:pt-28 pb-12 px-2 md:px-4">
        <div className="w-full sm:w-[400px] bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-transparent hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-4 text-center">Edit Profile</h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={profile.image}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-emerald-200 shadow-sm mb-2"
            />
            <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-emerald-400 text-white hover:bg-emerald-500 transition text-xs sm:text-sm">
              Change Image
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
            {/* Name */}
            <div>
              <label className="text-xs sm:text-sm text-gray-600">Full Name</label>
              <div className="flex items-center bg-emerald-50 rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow-sm mt-1">
                <FaUser className="text-emerald-600 mr-2 text-sm sm:text-base" />
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-xs sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="text-xs sm:text-sm text-gray-600">Age</label>
              <div className="flex items-center bg-emerald-50 rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow-sm mt-1">
                <FaBirthdayCake className="text-emerald-600 mr-2 text-sm sm:text-base" />
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-xs sm:text-sm"
                  placeholder="Age"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs sm:text-sm text-gray-600">Gender</label>
              <div className="flex items-center bg-emerald-50 rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow-sm mt-1">
                <FaVenusMars className="text-emerald-600 mr-2 text-sm sm:text-base" />
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-xs sm:text-sm"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="text-xs sm:text-sm text-gray-600">Contact</label>
              <div className="flex items-center bg-emerald-50 rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow-sm mt-1">
                <FaPhoneAlt className="text-emerald-600 mr-2 text-sm sm:text-base" />
                <input
                  type="text"
                  name="contact"
                  value={profile.contact}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-xs sm:text-sm"
                  placeholder="Contact"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs sm:text-sm text-gray-600">Email</label>
              <div className="flex items-center bg-emerald-50 rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow-sm mt-1">
                <FaEnvelope className="text-emerald-600 mr-2 text-sm sm:text-base" />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-xs sm:text-sm"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center gap-1 w-full bg-emerald-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow hover:bg-emerald-700 transition text-xs sm:text-sm"
            >
              <FaSave /> Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;