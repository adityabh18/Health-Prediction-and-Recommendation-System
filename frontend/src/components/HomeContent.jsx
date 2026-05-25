import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import doctors from "../assets/BannerImg.png";

function HomeContent() {
  const navigate = useNavigate();
  const { user } = useContext(authDataContext);

  const handleContact = () => {
    navigate("/contact");
  };

  const handlePredict = () => {
    // ✅ safe check (important)
    if (user && Object.keys(user).length > 0) {
      navigate("/services");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-[120px] px-4 md:px-6 pb-10
    bg-gradient-to-b from-white via-emerald-100 to-white overflow-x-hidden">

      {/* MAIN CARD */}
      <div className="w-full max-w-[1100px] bg-white rounded-3xl shadow-2xl 
      flex flex-col lg:flex-row items-center justify-between 
      px-6 md:px-10 lg:px-12 py-10 animated-border gap-10">

        {/* LEFT SECTION */}
        <div className="flex flex-col gap-6 w-full lg:w-[55%]">

          {/* TITLE */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Medi<span className="text-emerald-600">Care+</span>
            </h1>

            <div className="text-yellow-400 text-lg">★★★★★</div>

            <p className="text-gray-500 mt-2 text-base md:text-lg">
              Premium Healthcare
            </p>

            <p className="text-emerald-600 font-semibold text-lg md:text-xl">
              At Your Fingertips
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="text-black px-5 py-2 rounded-full text-sm font-medium
            bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
            shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
            hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center">
              AI-Powered Disease Prediction
            </div>

            <div className="text-black px-5 py-2 rounded-full text-sm font-medium
            bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
            shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
            hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center">
              24/7 Availability
            </div>

            <div className="text-black px-5 py-2 rounded-full text-sm font-medium
            bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
            shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
            hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center">
              Safe & Secure
            </div>

            <div className="text-black px-5 py-2 rounded-full text-sm font-medium
            bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
            shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
            hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center">
              500+ Doctors
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">

            {/* CONTACT */}
            <button
              onClick={handleContact}
              className="px-7 py-3 rounded-full text-white font-medium
              bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
              shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
              hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            >
              Contact With us
            </button>

            {/* PREDICT */}
            <button
              onClick={handlePredict}
              className="px-7 py-3 rounded-full text-red-600 font-medium
              bg-gradient-to-r from-red-100 via-red-200 to-red-100
              shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300
              hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            >
              Predict Now
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-[40%] flex justify-center">
          <img
            src={doctors}
            alt="doctors"
            className="w-full max-w-[420px] object-cover"
          />
        </div>

      </div>

    </div>
  );
}

export default HomeContent;