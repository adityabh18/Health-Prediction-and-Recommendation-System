import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaCommentDots,
  FaPhoneAlt,
} from "react-icons/fa";

import { authDataContext } from "../../../context/AuthContext";

function Appointments() {
  const { serverUrl } = useContext(authDataContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/appointment/doctor`,
          { withCredentials: true }
        );

        setAppointments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointments();
  }, [serverUrl]);

  const updateStatus = async (id, status) => {
    await axios.put(
      `${serverUrl}/api/appointment/update-status/${id}`,
      { status },
      { withCredentials: true }
    );

    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a))
    );
  };

  return (
    <div className="w-full min-h-screen px-4 py-10 bg-gradient-to-r from-emerald-50 via-white to-emerald-100">

      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        Doctor Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {appointments.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-3xl p-6 shadow-md
              hover:shadow-xl hover:-translate-y-1 transition duration-300
              border border-emerald-200"
            >

              {/* PATIENT NAME */}
              <div className="flex items-center gap-2 mb-3 bg-emerald-100 px-3 py-2 rounded-full">
                <FaUser className="text-emerald-600" />
                <h3 className="text-sm font-semibold text-gray-800">
                  {app.userId?.username}
                </h3>
              </div>

              {/* DATE */}
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-emerald-100 px-3 py-2 rounded-full mt-2">
                <FaCalendarAlt className="text-emerald-600" />
                <span>{app.date}</span>
              </div>

              {/* TIME */}
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-emerald-100 px-3 py-2 rounded-full mt-2">
                <FaClock className="text-emerald-600" />
                <span>{app.time}</span>
              </div>

              {/* STATUS */}
              <div className="flex items-center gap-2 mt-3 bg-emerald-100 px-3 py-2 rounded-full">
                <FaInfoCircle
                  className={
                    app.status === "approved"
                      ? "text-green-500"
                      : app.status === "rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }
                />
                <p
                  className={`font-semibold ${
                    app.status === "approved"
                      ? "text-green-600"
                      : app.status === "rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {app.status}
                </p>
              </div>

              {/* ACTIONS (Approve / Reject) */}
              {app.status === "pending" && (
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => updateStatus(app._id, "approved")}
                    className="px-4 py-2 rounded-full text-white w-full
                    bg-gradient-to-r from-emerald-500 to-green-600
                    shadow-md hover:shadow-xl hover:-translate-y-1 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="px-4 py-2 rounded-full text-white w-full
                    bg-gradient-to-r from-red-500 to-pink-600
                    shadow-md hover:shadow-xl hover:-translate-y-1 transition"
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* CHAT + CALL (ONLY IF APPROVED) */}
              {app.status === "approved" && (
                <div className="flex gap-3 mt-5 justify-start">

                  {/* CHAT */}
                  <button
                    onClick={() =>
                      (window.location.href = `/chat/${app._id}`)
                    }
                    className="px-5 py-2 rounded-full text-white font-medium
                    bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
                    shadow-md shadow-emerald-200
                    hover:shadow-xl hover:-translate-y-1
                    transition-all duration-300 text-sm flex items-center gap-2"
                  >
                    <FaCommentDots />
                    Chat
                  </button>

                  

                </div>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Appointments;