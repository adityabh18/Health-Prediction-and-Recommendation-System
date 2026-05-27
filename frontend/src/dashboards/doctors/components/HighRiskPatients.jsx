import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../../../context/AuthContext";

function HighRiskPatients() {

  const { serverUrl } = useContext(authDataContext);

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchPatients = async () => {
      try {

        const res = await axios.get(
          `${serverUrl}/api/user/high-risk-patients`,
          {
            withCredentials: true,
          }
        );

        setData(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();

  }, [serverUrl]);

  return (
  <div className="w-full min-h-screen px-4 py-10 bg-gradient-to-r from-emerald-50 via-white to-emerald-100">

    <div className="max-w-[900px] mx-auto">

      {/* Heading */}
      <h2 className="text-3xl font-semibold text-center text-emerald-700">
        High Risk Patients
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-500 mt-2 mb-10 text-sm md:text-base">
        Patients with high risk predictions who consulted you
      </p>

      {/* Cards */}
      {data.length === 0 ? (

        <p className="text-gray-500 text-center">
          No high risk patients found
        </p>

      ) : (

        <div className="flex flex-col gap-6">

          {data.map((p, i) => (

            <div
              key={i}
              className="
                bg-white rounded-3xl p-6 shadow-md
                border border-emerald-200
                transition duration-300
                hover:shadow-xl hover:-translate-y-1
                flex justify-between items-center
              "
            >

              {/* LEFT SIDE */}
              <div>

                <h3 className="text-lg font-semibold text-emerald-600">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {p.disease}
                </p>

                {/* BUTTON */}
                <button
                  className="
                    mt-4 px-4 py-2 text-sm rounded-full text-white
                    bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
                    shadow-md shadow-emerald-200
                    hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  View Details
                </button>

              </div>

              {/* RISK BADGE */}
              <span
                className="
                  px-4 py-2 rounded-full text-xs font-medium
                  text-red-600 bg-red-100
                "
              >
                High Risk
              </span>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
}

export default HighRiskPatients;