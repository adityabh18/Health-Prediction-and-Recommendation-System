import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PredictionResult from "../components/PredictionResult";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function KidneyPredictor() {
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    age: "",
    bp: "",
    sg: "",
    al: "",
    su: "",
    bgr: "",
    bu: "",
    sc: "",
    hemo: "",
    htn: "",
    dm: "",
    appet: "",
  });

  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  const resultRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);

    setLoading(true);
    setShowResult(false);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);

    try {
      const response = await axios.post(
        serverUrl + "/api/predict/kideny-disease",
        formData,
        {
          withCredentials: true,
        },
      );

      setPredictionData(response.data);
      toast.success("Predicted successfully");
    } catch (err) {
      console.error("Prediction error:", err);
      toast.error("Error while predicting desease");
      setPredictionData({
        confidence: 0,
        riskLevel: "Unknown",
        recommendations: {
          diet: [],
          exercise: [],
          tests: [],
          medicine: [],
          specialist: "Nephrologist",
        },
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setShowResult(true);

        setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }, 200);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-28">
        <div className="w-full max-w-[750px] bg-white p-6 rounded-3xl shadow-lg">
          {/* Header */}

          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-emerald-700">
              Kidney Disease Predictor
            </h2>

            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
              ML Model
            </span>
          </div>

          <p className="text-gray-500 text-sm mb-6">
            Enter basic medical and lab report details to estimate kidney
            disease risk.
          </p>

          {/* Form Grid */}

          <div className="grid grid-cols-2 gap-4">
            {/* Age */}

            <div>
              <label className="text-sm text-gray-600">Age (Years)</label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <input
                  type="number"
                  name="age"
                  placeholder="e.g. 45"
                  value={formData.age}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Blood Pressure */}

            <div>
              <label className="text-sm text-gray-600">
                Blood Pressure (mmHg)
              </label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <input
                  type="number"
                  name="bp"
                  placeholder="e.g. 120"
                  value={formData.bp}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Specific Gravity */}

            <div>
              <label className="text-sm text-gray-600">
                Urine Specific Gravity
              </label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <select
                  name="sg"
                  value={formData.sg}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm appearance-none focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option>1.005</option>
                  <option>1.010</option>
                  <option>1.015</option>
                  <option>1.020</option>
                  <option>1.025</option>
                </select>
              </div>
            </div>

            {/* Albumin */}

            <div>
              <label className="text-sm text-gray-600">
                Urine Albumin Level
              </label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <select
                  name="al"
                  value={formData.al}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm appearance-none focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>

            {/* Sugar */}

            <div>
              <label className="text-sm text-gray-600">Urine Sugar Level</label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <select
                  name="su"
                  value={formData.su}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm appearance-none focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>

            {/* Blood Glucose */}

            <div>
              <label className="text-sm text-gray-600">
                Random Blood Sugar (mg/dL)
              </label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <input
                  type="number"
                  name="bgr"
                  placeholder="e.g. 150"
                  value={formData.bgr}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Blood Urea */}

            <div>
              <label className="text-sm text-gray-600">
                Blood Urea (mg/dL)
              </label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <input
                  type="number"
                  name="bu"
                  placeholder="e.g. 40"
                  value={formData.bu}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Creatinine */}

            <div>
              <label className="text-sm text-gray-600">
                Serum Creatinine (mg/dL)
              </label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <input
                  type="number"
                  name="sc"
                  placeholder="e.g. 1.2"
                  value={formData.sc}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Hemoglobin */}

            <div>
              <label className="text-sm text-gray-600">Hemoglobin (g/dL)</label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <input
                  type="number"
                  name="hemo"
                  placeholder="e.g. 13.5"
                  value={formData.hemo}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Hypertension */}

            <div>
              <label className="text-sm text-gray-600">
                High Blood Pressure
              </label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <select
                  name="htn"
                  value={formData.htn}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm appearance-none focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>

            {/* Diabetes */}

            <div>
              <label className="text-sm text-gray-600">Diabetes</label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <select
                  name="dm"
                  value={formData.dm}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm appearance-none focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="1">Diabetic</option>
                  <option value="0">Non-Diabetic</option>
                </select>
              </div>
            </div>

            {/* Appetite */}

            <div>
              <label className="text-sm text-gray-600">
                Appetite Condition
              </label>

              <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                <select
                  name="appet"
                  value={formData.appet}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm appearance-none focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="1">Normal Appetite</option>
                  <option value="0">Poor Appetite</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="px-7 py-3 rounded-full text-white font-medium
              bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
              shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300
              hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            >
              Predict Kidney Disease
            </button>
          </div>
        </div>
      </div>

      {/* Result Section */}

      <div ref={resultRef}>
        {loading && (
          <div className="flex flex-col items-center justify-center pb-10">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>

            <p className="mt-4 text-emerald-700 font-medium">
              AI is analyzing kidney disease risk...
            </p>
          </div>
        )}

        {showResult && predictionData && (
          <PredictionResult
            disease="Kidney Disease"
            confidence={predictionData.confidence}
            risk={predictionData.riskLevel}
            diet={predictionData.recommendations?.diet || []}
            exercise={predictionData.recommendations?.exercise || []}
            tests={predictionData.recommendations?.tests || []}
            medicine={predictionData.recommendations?.medicine || []}
            specialist={
              predictionData.recommendations?.specialist || "Nephrologist"
            }
            buttonText="Find Nephrologist"
          />
        )}
      </div>
    </div>
  );
}

export default KidneyPredictor;
