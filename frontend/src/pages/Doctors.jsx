import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

import {
  FaMapMarkerAlt,
  FaHospital,
  FaComments,
  FaUserMd,
  FaHeartbeat,
  FaSearch,
  FaCalendarCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const { serverUrl } = useContext(authDataContext);

  const [search, setSearch] = useState("");

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate=useNavigate();

  // ================= FETCH DOCTORS =================

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/doctor/all-doctors`, {
          withCredentials: true,
        });

        setDoctors(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [serverUrl]);

  // ================= SEARCH FILTER =================

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.username?.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(search.toLowerCase()) ||
      doc.location?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-emerald-50 via-white to-emerald-100 overflow-x-hidden">
      <Navbar />

      <div className="py-16 px-4">
        {/* ================= HEADING ================= */}

        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Meet Our <span className="text-emerald-600">Medical Experts</span>
          </h1>

          <p className="text-gray-500 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Connect with experienced and trusted doctors for personalized
            healthcare consultation and AI-powered medical support.
          </p>
        </div>

        {/* ================= SEARCH BAR ================= */}

        <div className="flex justify-center mb-14">
          <div className="w-full max-w-[550px] bg-white rounded-full shadow-lg border border-emerald-100 flex items-center px-5 py-3">
            <FaSearch className="text-emerald-500 text-lg mr-3" />

            <input
              type="text"
              placeholder="Search doctors by name, specialization or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="text-center text-lg text-emerald-700 font-semibold">
            Loading Doctors...
          </div>
        )}

        {/* ================= DOCTORS GRID ================= */}

        {!loading && (
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                {/* ================= TOP SECTION ================= */}

                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white relative">
                  <div className="flex items-center gap-4">
                    {/* IMAGE */}

                    {doc.photo ? (
                      <img
                        src={doc.photo}
                        alt={doc.username}
                        className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-white text-emerald-600 flex items-center justify-center text-4xl border-4 border-white shadow-lg">
                        <FaUserMd />
                      </div>
                    )}

                    {/* INFO */}

                    <div>
                      <h3 className="text-2xl font-bold">Dr. {doc.username}</h3>

                      <p className="text-emerald-100 text-sm mt-1">
                        {doc.specialization || "General Physician"}
                      </p>

                      <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                        {doc.experience || 0} Years Experience
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= BODY ================= */}

                <div className="p-6">
                  {/* LOCATION */}

                  <div className="flex items-center gap-3 text-gray-600 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <FaMapMarkerAlt />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Location</p>

                      <p className="font-medium">
                        {doc.location || "Not Added"}
                      </p>
                    </div>
                  </div>

                  {/* HOSPITAL */}

                  <div className="flex items-center gap-3 text-gray-600 mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                      <FaHospital />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Hospital</p>

                      <p className="font-medium">
                        {doc.hospital || "Not Added"}
                      </p>
                    </div>
                  </div>

                  {/* FEES */}

                  <div className="bg-emerald-50 rounded-2xl p-4 flex items-center justify-between mb-5">
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>

                      <h3 className="text-2xl font-bold text-emerald-600">
                        ₹ {doc.fees || 0}
                      </h3>
                    </div>

                    <FaHeartbeat className="text-3xl text-emerald-500" />
                  </div>

                  {/* BUTTON */}

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => navigate(`/book-appointment/${doc._id}`)}
                      className="w-[80%] mx-auto mt-6 py-3 rounded-full text-white
  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
  hover:shadow-2xl hover:-translate-y-2 transition-all flex items-center justify-center gap-2"
                    >
                      <FaCalendarCheck />
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= NO DOCTORS ================= */}

        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center text-gray-600 text-lg mt-10">
            No doctors found
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctors;
