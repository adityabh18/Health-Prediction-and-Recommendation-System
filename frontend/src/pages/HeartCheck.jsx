import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PredictionResult from "../components/PredictionResult";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function HeartPrediction() {
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    Sex: "",
    AgeCategory: "",
    HeightInMeters: "",
    WeightInKilograms: "",
    SmokerStatus: "",
    AlcoholDrinkers: "",
    PhysicalActivities: "",
    SleepHours: "",
    HadStroke: "",
    HadDiabetes: "",
    DifficultyWalking: "",
    HadAsthma: "",
    HadKidneyDisease: "",
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

  const calculateBMI = () => {
    const height = parseFloat(formData.HeightInMeters);
    const weight = parseFloat(formData.WeightInKilograms);

    if (!height || !weight) return 0;

    const heightInMeter = height / 100;

    return (weight / (heightInMeter * heightInMeter)).toFixed(2);
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some((v) => v === "")) {
      toast.error("Please fill all fields properly");
      return;
    }

    setLoading(true);
    setShowResult(false);

    try {
      const bmi = calculateBMI();

      const payload = {
        Sex: formData.Sex,

        AgeCategory: formData.AgeCategory,

        HeightInMeters: parseFloat(formData.HeightInMeters) / 100,

        WeightInKilograms: parseFloat(formData.WeightInKilograms),

        BMI: parseFloat(bmi),

        SmokerStatus: formData.SmokerStatus,

        AlcoholDrinkers: formData.AlcoholDrinkers,

        PhysicalActivities: formData.PhysicalActivities,

        SleepHours: parseFloat(formData.SleepHours),

        HadDiabetes: formData.HadDiabetes,

        HadAsthma: formData.HadAsthma,

        HadKidneyDisease: formData.HadKidneyDisease,

        DifficultyWalking: formData.DifficultyWalking,

        HadStroke: formData.HadStroke,
      };

      const response = await axios.post(
        serverUrl + "/api/predict/heart-disease",
        payload,
        {
          withCredentials: true,
        },
      );
      console.log(payload);
      setPredictionData(response.data);
      toast.success("Prediction completed successfully!");
    } catch (err) {
      console.error("Prediction error:", err);
      toast.error("Prediction failed, showing fallback result");

      if (err.response) {
        console.log(err.response.data);
      }

      setPredictionData({
        predictedDisease: "Error",
        confidence: 0,
        riskLevel: "Unknown",
        recommendations: {
          diet: [],
          exercise: [],
          tests: [],
          medicine: [],
          specialist: "Cardiologist",
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
      }, 1500);
    }
  };

  useEffect(() => {
    if ((loading || showResult) && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [loading, showResult]);

  const fields = [
    {
      label: "Gender",
      name: "Sex",
      type: "select",
      options: ["Male", "Female"],
    },

    {
      label: "Age Group",
      name: "AgeCategory",
      type: "select",
      options: [
        "18-24",
        "25-29",
        "30-34",
        "35-39",
        "40-44",
        "45-49",
        "50-54",
        "55-59",
        "60-64",
        "65-69",
        "70-74",
        "75-79",
        "80+",
      ],
    },

    {
      label: "Height (cm)",
      name: "HeightInMeters",
      type: "number",
      placeholder: "Example: 170",
    },

    {
      label: "Weight (kg)",
      name: "WeightInKilograms",
      type: "number",
      placeholder: "Example: 70",
    },

    {
      label: "Smoking Habit",
      name: "SmokerStatus",
      type: "select",
      options: ["Never", "Former", "Current"],
    },

    {
      label: "Do you drink alcohol?",
      name: "AlcoholDrinkers",
      type: "select",
      options: ["Yes", "No"],
    },

    {
      label: "Do you do physical work or exercise daily?",
      name: "PhysicalActivities",
      type: "select",
      options: ["Yes", "No"],
    },

    {
      label: "Average Sleep Hours",
      name: "SleepHours",
      type: "number",
      placeholder: "Example: 7",
    },

    {
      label: "Do you have diabetes?",
      name: "HadDiabetes",
      type: "select",
      options: ["Yes", "No"],
    },

    {
      label: "Do you have asthma?",
      name: "HadAsthma",
      type: "select",
      options: ["Yes", "No"],
    },

    {
      label: "Any kidney disease/problem?",
      name: "HadKidneyDisease",
      type: "select",
      options: ["Yes", "No"],
    },

    {
      label: "Difficulty while walking?",
      name: "DifficultyWalking",
      type: "select",
      options: ["Yes", "No"],
    },

    {
      label: "History of stroke/paralysis?",
      name: "HadStroke",
      type: "select",
      options: ["Yes", "No"],
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-28">
        <div className="w-full max-w-[750px] bg-white p-6 rounded-3xl shadow-lg border border-transparent hover:border-emerald-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-emerald-700">
              Heart Disease Predictor
            </h2>

            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
              ML Model
            </span>
          </div>

          <p className="text-gray-500 text-sm mb-6">
            Fill your health details to check possible heart disease risk.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="text-sm text-gray-600">{field.label}</label>

                <div className="bg-emerald-50 rounded-full px-4 py-2 mt-1 shadow-sm">
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="bg-transparent w-full text-sm appearance-none focus:outline-none"
                    >
                      <option value="">Select...</option>

                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="bg-transparent w-full outline-none text-sm"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {formData.HeightInMeters && formData.WeightInKilograms && (
            <div className="mt-5 bg-emerald-100 text-emerald-700 rounded-xl px-4 py-3 text-sm font-medium">
              Your Calculated BMI: {calculateBMI()}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="
              px-7 py-3 rounded-full text-white font-medium
              bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
              shadow-md shadow-emerald-200
              hover:shadow-lg hover:shadow-emerald-300
              hover:-translate-y-0.5
              transition-all duration-300
              w-full sm:w-auto
              "
            >
              Predict Heart Risk
            </button>
          </div>
        </div>
      </div>

      <div ref={resultRef}>
        {loading && (
          <div className="flex flex-col items-center justify-center pb-10">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>

            <p className="mt-4 text-emerald-700 font-medium">
              AI is analyzing heart disease risk...
            </p>
          </div>
        )}

        {showResult && predictionData && (
          <PredictionResult
            disease={predictionData.predictedDisease || "Heart Disease"}
            confidence={predictionData.confidence}
            risk={predictionData.riskLevel}
            diet={predictionData.recommendations?.diet || []}
            exercise={predictionData.recommendations?.exercise || []}
            tests={predictionData.recommendations?.tests || []}
            medicine={predictionData.recommendations?.medicine || []}
            firstAid={predictionData.recommendations?.firstAid || []}
            specialist={
              predictionData.recommendations?.specialist || "Cardiologist"
            }
            buttonText="Find Cardiologist"
          />
        )}
      </div>
    </div>
  );
}

export default HeartPrediction;
