import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaAppleAlt,
  FaRunning,
  FaFlask,
  FaUserMd,
  FaFirstAid,
} from "react-icons/fa";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

function PredictionResult({
  disease = "N/A",
  localName,
  confidence = 0,
  risk = "Unknown",
  firstAid = [],
  diet = [],
  exercise = [],
  tests = [],
  specialist = "General Physician",
  buttonText = "Find Doctor",
}) {

  const navigate = useNavigate();


  const downloadPDF = () => {

    const docDefinition = {
      content: [
        { text: "AI Prediction Report", style: "header" },

        { text: "\nDisease Details", style: "subheader" },
        `Disease: ${disease}`,
        `Confidence: ${confidence}%`,
        `Risk Level: ${risk}`,

        { text: "\nDiet Recommendations", style: "subheader" },
        {
          ul: diet.length ? diet : ["Not available"],
        },

        { text: "\nExercise Plan", style: "subheader" },
        {
          ul: exercise.length ? exercise : ["Not available"],
        },

        { text: "\nLab Tests", style: "subheader" },
        {
          ul: tests.length ? tests : ["Not available"],
        },

        { text: "\nSpecialist", style: "subheader" },
        `Consult: ${specialist}`,
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(`${disease}_report.pdf`);
  };

  const renderList = (arr) => {

    if (!arr) {
      return (
        <li className="text-gray-400 italic">
          Not available
        </li>
      );
    }

    if (typeof arr === "string") {
      arr = arr.split(",").map((item) => item.trim()).filter(Boolean);
    }

    if (!Array.isArray(arr) || arr.length === 0) {
      return (
        <li className="text-gray-400 italic">
          Not available
        </li>
      );
    }

    return arr.map((item, i) => (
      <li key={i}>✔ {item}</li>
    ));
  };

  const showFirstAid =
    disease !== "Heart Disease" &&
    disease !== "No Heart Disease" &&
    disease !== "Diabetes" &&
    disease !== "No Diabetes" &&
    disease !== "kidney disease" &&
    disease !== "No Kidney Disease" &&
    disease !== "Kidney Disease";

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200 py-16">

      <div className="max-w-[1000px] w-full mx-auto px-4">

        <div
          className="bg-white rounded-3xl shadow-xl p-10 border border-transparent
          hover:border-emerald-400
          hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]
          transition"
        >

          <div className="space-y-10">

            {/* Prediction Result */}
            <div className="bg-white rounded-2xl shadow-md p-6">

              <div className="flex justify-between items-center flex-wrap gap-6">

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Based on your inputs, you might have
                  </h2>

                  <h1 className="text-3xl font-bold text-emerald-600 mt-1">
  {disease}
</h1>

<p className="text-sm text-green-500 mt-1">
  {localName ? `(${localName})` : ""}
</p>
                </div>

                <div className="text-right">

                  <p className="text-4xl font-bold text-emerald-600">
                    {confidence}%
                  </p>

                  <p className="text-sm text-gray-500">
                    Confidence
                  </p>

                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                    {risk}
                  </span>

                </div>

              </div>

              {/* Progress */}
              <div className="w-full bg-gray-200 rounded-full h-3 mt-5">
                <div
                  className="bg-emerald-500 h-3 rounded-full"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>

              {/* DOWNLOAD BUTTON */}
<div className="flex justify-end mt-4">
  <button
    onClick={downloadPDF}
    className="px-5 sm:px-7 py-2 sm:py-3 rounded-full text-white font-medium
    bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
    shadow-md shadow-emerald-200 hover:shadow-lg
    hover:shadow-emerald-300 hover:-translate-y-0.5
    transition-all duration-300"
  >
    Download PDF
  </button>
</div>

            </div>

            {/* Recommendation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {showFirstAid && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <FaFirstAid className="text-emerald-500 text-xl" />
                    <h3 className="font-semibold text-gray-800 text-lg">
                      First Aid
                    </h3>
                  </div>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    {renderList(firstAid)}
                  </ul>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FaAppleAlt className="text-emerald-500 text-xl" />
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Diet Recommendations
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {renderList(diet)}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FaRunning className="text-emerald-500 text-xl" />
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Exercise Plan
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {renderList(exercise)}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FaFlask className="text-emerald-500 text-xl" />
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Suggested Lab Tests
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {renderList(tests)}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FaUserMd className="text-emerald-500 text-xl" />
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Specialist Recommendation
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Consult {specialist}
                </p>

                <button
                  onClick={() => navigate("/doctors")}
                  className="px-7 py-3 rounded-full text-white font-medium
                  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600"
                >
                  {buttonText}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PredictionResult;