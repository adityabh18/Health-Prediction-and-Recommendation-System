import React, { useState, useRef, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import PredictionResult from "../components/PredictionResult";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
function SymptomChecker() {
  const [text, setText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const resultRef = useRef(null);

  const handleAnalyze = async () => {
    if (text.length < 10) {
      toast.error("Please fill minimum 10 charecters");
      return;
    }

    try {
      setLoading(true);
      setShowResult(false);

      const response = await axios.post(
        serverUrl + "/api/predict/general-desease",
        { text: text },
        { withCredentials: true },
      );

      console.log("Prediction result:", response.data);

      setResult(response.data);

      toast.success("Predicted Successfully");
      setTimeout(() => {
        setLoading(false);
        setShowResult(true);
      }, 1500);
    } catch (error) {
      console.error("API Error:", error);

      toast.error("Server error while analyzing symptoms");

      setLoading(false);
    }
  };

  // Scroll when loading starts
  useEffect(() => {
    if (loading && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [loading]);

  // Scroll when result appears
  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [showResult]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-28">
        <div className="w-full max-w-[550px] bg-white p-6 rounded-3xl shadow-lg border border-transparent hover:border-emerald-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          {/* Header */}

          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-emerald-700">
              General Disease Predictor
            </h2>

            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
              NLP AI
            </span>
          </div>

          <p className="text-gray-500 text-sm mb-5">
            Describe your symptoms in natural language. Our AI will analyze them
            and predict possible diseases.
          </p>

          {/* Example chips */}

          <p className="text-sm text-gray-500 mb-2">Try an example:</p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              red itchy skin with fever
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              headache and vomiting
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              stomach pain and diarrhea
            </span>
          </div>

          {/* Symptom Input */}

          <div className="mb-4">
            <label className="text-sm text-gray-600">
              Describe Your Symptoms
            </label>

            <div className="bg-emerald-50 rounded-xl p-3 shadow-sm mt-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Example: I have red itchy spots on my skin and mild fever since yesterday..."
                className="w-full bg-transparent outline-none text-sm h-24"
              />
            </div>

            <p className="text-xs text-gray-400 mt-1">
              Minimum 10 characters required
            </p>
          </div>

          {/* Analyze Button */}

          <button
            onClick={handleAnalyze}
            className="px-7 py-3 rounded-full text-white font-medium
              bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
              shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
              hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            Analyze Disease
          </button>
        </div>
      </div>

      {/* Loading + Result Section */}

      <div ref={resultRef}>
        {loading && (
          <div className="flex flex-col items-center justify-center pb-10">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>

            <p className="mt-4 text-emerald-700 font-medium">
              AI is analyzing your symptoms...
            </p>
          </div>
        )}

        {showResult && result && (
         <PredictionResult
  disease={result.predictedDisease}
  localName={result?.recommendations?.localName}
  confidence={result.confidence}
  risk={result.riskLevel}
  firstAid={result?.recommendations?.firstAid}
  diet={result?.recommendations?.diet}
  exercise={result?.recommendations?.exercise}
  tests={result?.recommendations?.tests}
  medicine={result?.recommendations?.medicine}
  specialist={result?.recommendations?.specialist}
/>
        )}
      </div>
    </div>
  );
}

export default SymptomChecker;
