import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PredictionResult from "../components/PredictionResult";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function DiabetesPredictor() {
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    HighBP: "",
    HighChol: "",
    weight: "",
    height: "",
    BMI: "",
    Smoker: "",
    Stroke: "",
    HeartDiseaseorAttack: "",
    PhysActivity: "",
    Fruits: "",
    Veggies: "",
    HvyAlcoholConsump: "",
    DiffWalk: "",
    GenHlth: "",
    Sex: "",
    Age: "",
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
    const bmi =
      formData.weight && formData.height
        ? (
            formData.weight /
            ((formData.height / 100) * (formData.height / 100))
          ).toFixed(2)
        : "";

    const payload = {
      HighBP: formData.HighBP,
      HighChol: formData.HighChol,
      BMI: bmi,
      Smoker: formData.Smoker,
      Stroke: formData.Stroke,
      HeartDiseaseorAttack: formData.HeartDiseaseorAttack,
      PhysActivity: formData.PhysActivity,
      Fruits: formData.Fruits,
      Veggies: formData.Veggies,
      HvyAlcoholConsump: formData.HvyAlcoholConsump,
      DiffWalk: formData.DiffWalk,
      GenHlth: formData.GenHlth,
      Sex: formData.Sex,
      Age: formData.Age,
    };

    const emptyFields = Object.entries(payload).filter(
      ([_, value]) => value === "" || value === null || value === undefined,
    );

    if (emptyFields.length > 0) {
       toast.error("Please fill all fields properly");
      return;
    }

    try {
      setLoading(true);
      setShowResult(false);

      const response = await axios.post(
        serverUrl + "/api/predict/diabetes-desease",
        payload,
        {
          withCredentials: true,
        },
      );

      setPredictionData(response.data);
      toast.success("Prediction completed successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Prediction failed, showing fallback result");
      setPredictionData({
        confidence: 0,
        riskLevel: "Unknown",
        recommendations: {
          diet: [],
          exercise: [],
          tests: [],
          medicine: [],
          specialist: "Doctor",
        },
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setShowResult(true);
      }, 1000);
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
      label: "Do you have high blood pressure?",
      name: "HighBP",
      type: "select",
    },
    {
      label: "Do you have high cholesterol?",
      name: "HighChol",
      type: "select",
    },
    {
      label: "Weight (kg)",
      name: "weight",
      type: "number",
    },
    {
      label: "Height (cm)",
      name: "height",
      type: "number",
    },
    {
      label: "Do you smoke?",
      name: "Smoker",
      type: "select",
    },
    {
      label: "Have you ever had a stroke?",
      name: "Stroke",
      type: "select",
    },
    {
      label: "Any heart disease or heart attack before?",
      name: "HeartDiseaseorAttack",
      type: "select",
    },
    {
      label: "Do you do physical activity daily?",
      name: "PhysActivity",
      type: "select",
    },
    {
      label: "Do you eat fruits regularly?",
      name: "Fruits",
      type: "select",
    },
    {
      label: "Do you eat vegetables regularly?",
      name: "Veggies",
      type: "select",
    },
    {
      label: "Do you consume alcohol heavily?",
      name: "HvyAlcoholConsump",
      type: "select",
    },
    {
      label: "Do you have difficulty walking?",
      name: "DiffWalk",
      type: "select",
    },
    {
      label: "How is your overall health?",
      name: "GenHlth",
      type: "select",
      options: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
    },
    {
      label: "Gender",
      name: "Sex",
      type: "select",
      options: ["Male", "Female"],
    },
    {
      label: "Age Group",
      name: "Age",
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
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-28">
        <div className="w-full max-w-[850px] bg-white p-6 rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-emerald-700">
              Diabetes Predictor
            </h2>

            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
              ML Model
            </span>
          </div>

          <p className="text-gray-500 text-sm mb-6">
            Fill your health details to predict diabetes risk.
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
                      <option value="">Select</option>

                      {(field.options || ["Yes", "No"]).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="bg-transparent w-full outline-none text-sm"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="px-7 py-3 rounded-full text-white font-medium
              bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
              shadow-md hover:shadow-lg transition-all duration-300"
            >
              Predict Diabetes Risk
            </button>
          </div>
        </div>
      </div>

      <div ref={resultRef}>
        {loading && (
          <div className="flex flex-col items-center justify-center pb-10">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>

            <p className="mt-4 text-emerald-700 font-medium">
              AI is analyzing diabetes risk...
            </p>
          </div>
        )}

        {showResult && predictionData && (
          <PredictionResult
            disease="Diabetes"
            confidence={predictionData.confidence}
            risk={predictionData.riskLevel}
            diet={predictionData.recommendations?.diet || []}
            exercise={predictionData.recommendations?.exercise || []}
            tests={predictionData.recommendations?.tests || []}
            medicine={predictionData.recommendations?.medicine || []}
            specialist={
              predictionData.recommendations?.specialist || "Endocrinologist"
            }
            buttonText="Find Doctor"
          />
        )}
      </div>
    </div>
  );
}

export default DiabetesPredictor;
