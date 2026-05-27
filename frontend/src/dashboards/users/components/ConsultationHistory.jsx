import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { authDataContext } from "../../../context/AuthContext";

function ConsultationHistory() {

  const { serverUrl } =
    useContext(authDataContext);

  const [consultations, setConsultations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [totalDoctors, setTotalDoctors] =
    useState(0);

  // ================= FETCH DATA =================

  useEffect(() => {

    const fetchConsultations = async () => {

      try {

        setLoading(true);

        const res = await axios.get(
          `${serverUrl}/api/appointment/user-consultations`,
          {
            withCredentials: true,
          }
        );

        setConsultations(
          res.data.consultations || []
        );

        setTotalDoctors(
          res.data.totalDoctorsConsulted || 0
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchConsultations();

  }, [serverUrl]);

  // ================= LOADING =================

  if (loading) {

    return (

      <p className="text-center mt-10 text-gray-500">
        Loading consultations...
      </p>

    );
  }

  return (

    <div className="w-full min-h-screen px-4 py-10 bg-gradient-to-r from-emerald-50 via-white to-emerald-100">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADING ================= */}

        <div className="text-center mb-10">

          <h2 className="text-3xl font-semibold text-emerald-700">

            Consultation History

          </h2>

          <p className="text-gray-500 mt-2">

            Doctors you consulted till now

          </p>

        </div>

        {/* ================= STATS ================= */}

        <div
          className="
            bg-white rounded-3xl shadow-md
            p-6 mb-10 border border-emerald-100
            text-center
          "
        >

          <h3 className="text-lg text-gray-600">

            Total Doctors Consulted

          </h3>

          <p className="text-4xl font-bold text-emerald-600 mt-2">

            {totalDoctors}

          </p>

        </div>

        {/* ================= EMPTY ================= */}

        {consultations.length === 0 ? (

          <p className="text-center text-gray-500">
            No consultation history found
          </p>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {consultations.map((item) => (

              <div
                key={item.id}
                className="
                  bg-white rounded-3xl shadow-md p-6
                  border border-emerald-100
                  hover:shadow-xl hover:-translate-y-1
                  transition duration-300
                "
              >

                {/* ================= TOP ================= */}

                <div className="flex items-center gap-4 mb-5">

                  <img
                    src={item.doctorImage}
                    alt={item.doctorName}
                    className="
                      w-16 h-16 rounded-full
                      border-2 border-emerald-400
                    "
                  />

                  <div>

                    <h3 className="text-lg font-semibold text-emerald-600">

                      Dr. {item.doctorName}

                    </h3>

                    <p className="text-sm text-gray-500">

                      {item.specialization}

                    </p>

                    <p className="text-xs text-gray-400">

                      {item.doctorEmail}

                    </p>

                  </div>

                </div>

                {/* ================= DETAILS ================= */}

                <div className="space-y-2 text-sm">

                  <p>

                    <span className="font-semibold">
                      Appointment Date:
                    </span>{" "}

                    {item.date}

                  </p>

                  <p>

                    <span className="font-semibold">
                      Time:
                    </span>{" "}

                    {item.time}

                  </p>

                  <p>

                    <span className="font-semibold">
                      Reason:
                    </span>{" "}

                    {item.reason}

                  </p>

                  <p>

                    <span className="font-semibold">
                      Status:
                    </span>{" "}

                    <span
                      className={`
                        capitalize font-medium
                        ${
                          item.status === "approved"
                            ? "text-emerald-600"
                            : item.status === "rejected"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }
                      `}
                    >

                      {item.status}

                    </span>

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ConsultationHistory;