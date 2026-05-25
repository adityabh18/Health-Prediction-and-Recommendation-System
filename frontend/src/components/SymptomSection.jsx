import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";

function SymptomSection() {
  const navigate = useNavigate();
  const { user } = useContext(authDataContext);

  const symptoms = [
    "Fever",
    "Nausea",
    "Cough",
    "Joint Pain",
    "Weight Loss",
    "Headache",
    "Fatigue",
    "Skin Rash",
    "Vomiting",
    "Yellow Eyes",
  ];

  const handleTryChecker = () => {
    if (user) {
      navigate("/services"); // logged in
    } else {
      navigate("/signin"); // not logged in
    }
  };

  return (
    <div
      className="w-full py-12 flex justify-center px-4
    bg-gradient-to-b from-white via-emerald-100 to-white overflow-x-hidden"
    >
      <div className="w-full max-w-[1100px]">
        {/* SECTION HEADING */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold">
            AI Symptom <span className="text-emerald-600">Checker</span>
          </h2>

          <p className="text-gray-500 mt-3 max-w-[650px] mx-auto text-sm md:text-base">
            Identify possible health conditions based on your symptoms using our
            advanced AI-powered health analysis system.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* LEFT CARD */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 animated-border">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Describe Your <span className="text-emerald-600">Symptoms</span>
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed text-sm md:text-base">
              Simply write how you are feeling in natural language. Our AI will
              analyze your symptoms and provide possible health insights.
            </p>

            {/* PROMPT EXAMPLES */}
            <div className="mt-6 space-y-3 text-sm md:text-base text-gray-700">
              <p className="bg-emerald-50 p-3 rounded-lg">
                💬 "I am feeling fever and headache"
              </p>
              <p className="bg-emerald-50 p-3 rounded-lg">
                💬 "I have body pain and fatigue since 2 days"
              </p>
              <p className="bg-emerald-50 p-3 rounded-lg">
                💬 "I am experiencing nausea and vomiting"
              </p>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleTryChecker}
              className="mt-8 px-7 py-3 rounded-full text-white font-medium
    bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
    shadow-md shadow-emerald-200
    hover:shadow-lg hover:shadow-emerald-300
    hover:-translate-y-0.5
    transition-all duration-300 w-full sm:w-auto"
            >
              Try Symptom Checker →
            </button>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 animated-border">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              How It Works
            </h2>

            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-emerald-500 text-white rounded-full font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    Give Prompts
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    Write What are you feeling?
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-emerald-500 text-white rounded-full font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    AI Analysis
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    Our AI analyzes your symptoms instantly
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-emerald-500 text-white rounded-full font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    Get Results
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    Receive potential disease predictions and insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GREEN GLOW DIVIDER */}
        <div className="w-full flex justify-center mt-10 md:mt-12">
          <div
            className="w-[85%] h-[3px]
          bg-gradient-to-r from-transparent via-emerald-400 to-transparent
          rounded-full shadow-lg shadow-emerald-300"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SymptomSection;
