import React, { useContext, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import google from "../assets/google.svg";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/googleLogin";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const navigate = useNavigate();
  const validateLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }

    if (!password) {
      setPasswordError("Password is required");
      return false;
    }

    return true;
  };

  /**
   * @description Noemal Login
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true },
      );

      console.log(result.data);
      toast.success("Login successful 🎉");

      await getCurrentUser();

      const user = result.data.user;

      if (user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message;

      if (msg) {
        // smart messages from backend
        if (msg) {
          if (msg.toLowerCase().includes("password")) {
            setPasswordError("Incorrect password");
          } else if (
            msg.toLowerCase().includes("email") ||
            msg.toLowerCase().includes("user")
          ) {
            setEmailError("User not found");
          } else {
            setEmailError(msg);
          }
        } else {
          setEmailError("Login failed. Please try again");
        }
      } else {
        toast.error("Login failed. Please try again");
      }
    }
  };

  /**
   * @description Google Login
   */
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        serverUrl + "/api/auth/google-login",
        {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
        {
          withCredentials: true,
        },
      );

      const data = result.data;

      // ================= ROLE NOT SET =================
      if (data.needRole) {
        toast.info("Please select your role to continue");

        navigate("/select-role", {
          state: {
            name: user.displayName,
            email: user.email,
          },
        });
        return;
      }

      // ================= LOGIN COMPLETE =================
      toast.success("Google login successful 🎉");

      await getCurrentUser();

      const role = data.user?.role;

      if (role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/user-dashboard");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error?.code === "auth/popup-closed-by-user") {
        toast.error("Login cancelled ❌");
      } else if (error?.code === "auth/network-request-failed") {
        toast.error("Network error. Try again");
      } else {
        // backend / axios error
        const msg = error?.response?.data?.message;
        toast.error(msg || "Google login failed ❌");
      }
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
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">Login</h2>

          <p className="text-gray-500 text-sm mb-6">
            Access your health prediction account
          </p>

          {/* GOOGLE LOGIN */}
          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-full hover:bg-gray-50 transition mb-4"
          >
            <img src={google} alt="google" className="w-5 h-5" />
            Login with Google
          </button>

          {/* OR */}
          <div className="flex items-center mb-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleLogin}>
            {/* EMAIL */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Email</label>

              <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
                <FaEnvelope className="text-emerald-600 mr-3" />

                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className="bg-transparent w-full outline-none"
                />
              </div>

              {emailError && (
                <p className="text-red-500 text-sm mt-1 ml-2">{emailError}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-5">
              <label className="text-sm text-gray-600">Password</label>

              <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-sm mt-1">
                <FaLock className="text-emerald-600 mr-3" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className="bg-transparent w-full outline-none"
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              className="w-full px-7 py-3 rounded-full text-white font-medium
  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
  shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
  hover:-translate-y-0.5 transition-all duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
