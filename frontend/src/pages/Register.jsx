import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import google from "../assets/google.svg"
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios"
import { userDataContext } from "../context/UserContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/googleLogin.js";
import { toast } from "react-toastify";

function Register() {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("user");

  const {serverUrl}=useContext(authDataContext);
  const {getCurrentUser}=useContext(userDataContext)

  const navigate = useNavigate();

  const validateForm = () => {
  if (!username.trim()) {
    toast.error("Username is required");
    return false;
  }

  if (!email.trim()) {
    toast.error("Email is required");
    return false;
  }

  // email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email");
    return false;
  }

  if (!password) {
    toast.error("Password is required");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};


  /**
 * @description Normal Signup function
 */
const handalSignup = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {

    const result = await axios.post(
      serverUrl + "/api/auth/register",
      {
        username,
        email,
        password,
        role,
      },
      {
        withCredentials: true,
      }
    );

    console.log(result.data);

     toast.success("Registration successful 🎉");

    // ✅ current user fetch
    await getCurrentUser();

    const user = result.data.user;

    // ✅ role based navigation
    if (user.role === "doctor") {

      navigate("/doctor-dashboard");

    } else {

      navigate("/user-dashboard");

    }

  } catch (error) {

    console.log(error);

  }
};

/**
 * @description Google Signup function
 */
const googleSignup = async () => {

  try {

    const response = await signInWithPopup(auth, provider);

    const user = response.user;

    const result = await axios.post(

      serverUrl + "/api/auth/googlelogin",

      {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },

      {
        withCredentials: true,
      }

    );

    // ✅ NEW USER -> ROLE SELECT PAGE
    if (result.data.needRole) {

      navigate("/select-role", {
        state: {
          name: user.displayName,
          email: user.email,
        },
      });

      return;
    }

    // ✅ Existing user
    await getCurrentUser();

    const role = result.data.user?.role;

    // ✅ role based navigation
    if (role === "doctor") {

      navigate("/doctor-dashboard");

    } else {

      navigate("/user-dashboard");

    }

  } catch (error) {

    console.log(error);

  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      {/* LOGO */}
      <Link to="/" className="absolute top-6 left-8 flex items-center gap-3">
        <img src={logo} alt="logo" className="w-14 h-14" />

        <h1 className="text-3xl font-bold text-emerald-700 hover:text-emerald-800 transition">
          MediCare
        </h1>
      </Link>

      <div className="flex justify-center items-center min-h-screen">
        <div
          className="bg-white p-8 rounded-3xl shadow-lg w-[380px]
        border border-transparent hover:border-emerald-400 
        hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Register to access health prediction services
          </p>

          {/* GOOGLE LOGIN */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-full hover:bg-gray-50 transition mb-4 cursor-pointer"
          onClick={googleSignup}>
            <img
              src={google}
              alt="google"
              className="w-5 h-5"
            />
            Register with Google
          </button>

          {/* OR */}
          <div className="flex items-center mb-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handalSignup}>
            {/* USERNAME */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Username</label>

              <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
                <FaUser className="text-emerald-600 mr-3" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  onChange={(e)=>setUsername(e.target.value)}
                  className="bg-transparent w-full outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Email</label>

              <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
                <FaEnvelope className="text-emerald-600 mr-3" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={(e)=>setEmail(e.target.value)}
                  className="bg-transparent w-full outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Password</label>

              <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
                <FaLock className="text-emerald-600 mr-3" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e)=>setPassword(e.target.value)}
                  className="bg-transparent w-full outline-none"
                />
              </div>
            </div>

            {/* ROLE */}
            <div className="mb-5">
              <label className="text-sm text-gray-600">Select Role</label>

              <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
                <FaUserTag className="text-emerald-600 mr-3" />
                <select
                  name="role"
                  onChange={(e)=>setRole(e.target.value)}
                  className="bg-transparent w-full outline-none"
                >
                  <option value="user">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </div>

            <button

            
              className="w-full px-7 py-3 rounded-full text-white font-medium
  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
  shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
  hover:-translate-y-0.5 transition-all duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
