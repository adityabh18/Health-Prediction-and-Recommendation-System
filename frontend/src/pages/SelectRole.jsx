import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";

import { FaUserMd, FaUser, FaArrowRight } from "react-icons/fa";

function SelectRole() {
  const [role, setRole] = useState("user");

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const location = useLocation();
  const navigate = useNavigate();

  const { name, email } = location.state || {};

  useEffect(() => {
    if (!email) navigate("/signin");
  }, [email, navigate]);

  const handleRoleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/set-role`,
        { name, email, role },
        { withCredentials: true }
      );

      if (res.data?.user) {
        await getCurrentUser();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">

      {/* LOGO */}
      <Link className="absolute top-6 left-8 flex items-center gap-3">
        <img src={logo} className="w-14 h-14" />
        <h1 className="text-3xl font-bold text-emerald-700">MediCare</h1>
      </Link>

      <div className="flex justify-center items-center min-h-screen px-4">

        {/* CARD */}
<div className="bg-white w-full max-w-md md:max-w-sm lg:max-w-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[420px] flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            Select Your Role
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Choose how you want to use MediCare
          </p>

          <form onSubmit={handleRoleSubmit}>

            <div className="space-y-3 mb-6">

              {/* PATIENT */}
              <label
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                ${role === "user" ? "bg-emerald-50 shadow-md" : "hover:bg-gray-50 shadow-sm"}`}
              >
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <FaUser className="text-emerald-600" />
                <span>Patient</span>
              </label>

              {/* DOCTOR */}
              <label
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                ${role === "doctor" ? "bg-emerald-50 shadow-md" : "hover:bg-gray-50 shadow-sm"}`}
              >
                <input
                  type="radio"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <FaUserMd className="text-emerald-600" />
                <span>Doctor</span>
              </label>

            </div>
{/* BUTTON */}
<div className="mt-10 flex justify-center">
  <button
    type="submit"
    className="w-[60%] flex items-center justify-center gap-2 py-3 rounded-full text-white
    bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
    border border-transparent
    hover:border-emerald-300
    hover:shadow-xl hover:-translate-y-2
    active:scale-95
    transition-all duration-300"
  >
    Continue
    <FaArrowRight />
  </button>
</div>
          </form>

        </div>

      </div>
    </div>
  );
}

export default SelectRole;