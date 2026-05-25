import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

import {
  FaCalendarAlt,
  FaClock,
  FaNotesMedical,
  FaUserMd,
  FaCalendarCheck,
} from "react-icons/fa";

function BookAppointment() {
  const { doctorId } = useParams();
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleBook = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${serverUrl}/api/appointment/book`,
        {
          doctorId,
          date,
          time,
          reason,
        },
        { withCredentials: true }
      );

  
      toast.success("Appointment Booked Successfully 🎉");

      navigate("/user-dashboard", { state: { tab: "appointments" } });
    } catch (err) {
      console.log(err);

      toast.error("Failed to book appointment");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">
      <Navbar />

      <div className="max-w-[950px] w-full mx-auto px-4 pt-24 md:pt-28 pb-12 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

          <h2 className="text-2xl font-bold text-emerald-700 mb-2 flex items-center gap-2">
            <FaUserMd />
            Book Appointment
          </h2>

          <p className="text-gray-500 text-sm mb-5">
            Select date, time and describe your health concern.
          </p>

          <form onSubmit={handleBook}>

            {/* DATE */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Select Date</label>
              <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
                <FaCalendarAlt className="text-emerald-600 mr-3" />
                <input
                  type="date"
                  className="bg-transparent w-full outline-none"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* TIME */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Select Time</label>
              <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 mt-1">
                <FaClock className="text-emerald-600 mr-3" />
                <input
                  type="time"
                  className="bg-transparent w-full outline-none"
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* REASON */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">
                Reason / Symptoms
              </label>

              <div className="bg-emerald-50 rounded-xl p-3 mt-1">
                <div className="flex items-start gap-2">
                  <FaNotesMedical className="text-emerald-600 mt-1" />
                  <textarea
                    rows="4"
                    placeholder="Describe your problem..."
                    className="w-full bg-transparent outline-none"
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white
              bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
              border border-transparent hover:border-emerald-400
              hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <FaCalendarCheck className="text-lg" />
              Book Appointment
            </button>

          </form>
        </div>

        {/* RIGHT INFO */}
        <div className="space-y-4">

          <div className="bg-white p-5 rounded-2xl shadow-md border-none hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2">
              Doctor Consultation
            </h3>
            <p className="text-gray-600 text-sm">
              Your appointment will be confirmed shortly after booking.
            </p>
          </div>

          <div className="bg-emerald-100 p-5 rounded-2xl shadow-md border-none hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <h3 className="font-semibold">Important Notes</h3>
            <p className="text-sm text-gray-700 mt-1">
              • Be on time <br />
              • Keep medical history ready <br />
              • Chat available after booking
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default BookAppointment;