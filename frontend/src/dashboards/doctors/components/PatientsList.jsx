import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "../../../context/AuthContext";

function PatientsList() {

  const { serverUrl } = useContext(authDataContext);

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchPatients = async () => {
      try {

        const res = await axios.get(
          `${serverUrl}/api/doctor/patients`,
          {
            withCredentials: true,
          }
        );

        setPatients(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();

  }, [serverUrl]);

  const filteredPatients = patients.filter((p) =>
    p.username
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen px-4 py-10 bg-gradient-to-r from-emerald-50 via-white to-emerald-100">

      <div className="max-w-[900px] mx-auto">

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Patients List
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-10 text-sm md:text-base">
          Patients who booked appointments with you
        </p>

        {/* SEARCH */}
        <input
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            border border-emerald-200 p-3 w-full rounded-2xl mb-8
            outline-none focus:ring-2 focus:ring-emerald-400
            bg-white shadow-sm
          "
        />

        {/* PATIENT CARDS */}
        {filteredPatients.length === 0 ? (

          <p className="text-center text-gray-500">
            No patients found
          </p>

        ) : (

          <div className="flex flex-col gap-6">

            {filteredPatients.map((patient, i) => (

              <div
  key={i}
  className="
    bg-white rounded-3xl p-6 shadow-md
    border border-emerald-200
    transition duration-300
    hover:shadow-xl hover:-translate-y-1
    flex flex-col sm:flex-row
    sm:justify-between
    sm:items-center
    gap-4
  "
>

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  <img
                    src={
                      patient.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={patient.username}
                    className="w-14 h-14 rounded-full border-2 border-emerald-400"
                  />

                  <div>

                    <h3 className="text-lg font-semibold text-emerald-600">
                      {patient.username}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {patient.email}
                    </p>

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  className="
                    px-4 py-2 text-sm rounded-full text-white
                    bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
                    shadow-md shadow-emerald-200
                    hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  View Profile
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default PatientsList;