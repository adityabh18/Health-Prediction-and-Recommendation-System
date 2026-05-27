import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `${serverUrl}/api/history/get-history`,
        { withCredentials: true }
      );

      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load prediction history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

 const safeArray = (data) => {
  if (!data) return ["Not available"];

  if (Array.isArray(data)) return data;

  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      return data.split(",").map((i) => i.trim()).filter(Boolean);
    }
  }

  return ["Not available"];
};

const downloadReport = (item) => {
  const diet = safeArray(item.diet || item.dietPlan || item.food);
  const exercise = safeArray(item.exercise || item.exercisePlan);
  const tests = safeArray(item.tests || item.testList);

  const confidence =
    item.confidence ??
    item.confidenceScore ??
    item.probability ??
    0;

  const docDefinition = {
    content: [
      { text: "AI Prediction Report", style: "header" },

      { text: "\nDisease Details", style: "subheader" },
      `Disease: ${item.disease || "N/A"}`,
      `Confidence: ${confidence}%`,
      `Risk Level: ${item.risk || "N/A"}`,

      { text: "\nDiet Recommendations", style: "subheader" },
      { ul: diet },

      { text: "\nExercise Plan", style: "subheader" },
      { ul: exercise },

      { text: "\nLab Tests", style: "subheader" },
      { ul: tests },

      { text: "\nSpecialist", style: "subheader" },
      `Consult: ${item.specialist || "General Physician"}`,
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
    },
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`${item.disease || "report"}_report.pdf`);
};

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading history...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="w-full min-h-screen px-4 py-10 bg-gradient-to-r from-emerald-50 via-white to-emerald-100">
      <div className="max-w-[900px] mx-auto">
        <h2 className="text-3xl font-semibold text-center text-emerald-700">
          Prediction History
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-10">
          Your all past history is here
        </p>

        {history.length === 0 ? (
          <p className="text-center text-gray-500">No prediction history found</p>
        ) : (
          <div className="flex flex-col gap-6">

            {history.map((item, index) => {
              const riskColor = item.risk?.includes("High")
                ? "text-red-600 bg-red-100"
                : item.risk?.includes("Moderate")
                ? "text-yellow-600 bg-yellow-100"
                : "text-emerald-600 bg-emerald-100";

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 shadow-md border border-emerald-200"
                >

                  {/* TOP SECTION */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    {/* LEFT */}
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-600">
                        {item.disease || "Unknown Disease"}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.type?.toUpperCase() || "UNKNOWN"} •{" "}
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "No Date"}
                      </p>
                    </div>

                    {/* RIGHT - RISK (EXTREME RIGHT ON DESKTOP) */}
                    <span
                      className={`self-start md:ml-auto px-3 py-1 rounded-full text-xs font-medium ${riskColor}`}
                    >
                      {item.risk || "Unknown Risk"}
                    </span>

                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-3 mt-4 justify-start">

                    <button
                      onClick={() => downloadReport(item)}
                      className="px-4 py-2 text-sm rounded-full text-white
                      bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
                      shadow-md hover:-translate-y-1 transition"
                    >
                      Download
                    </button>

                    <button
                      onClick={() =>
                        navigate("/doctors", { state: { disease: item.disease } })
                      }
                      className="px-4 py-2 text-sm rounded-full text-white
                      bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
                      shadow-md hover:-translate-y-1 transition"
                    >
                      Consult Doctor
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionHistory;