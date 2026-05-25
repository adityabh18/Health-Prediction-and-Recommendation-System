import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {

  const { serverUrl } = useContext(authDataContext);

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchDoctor = async () => {

      try {

        const res = await axios.get(
          `${serverUrl}/api/user/current-user`,
          {
            withCredentials: true,
          }
        );

        setDoctor(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }
    };

    fetchDoctor();

  }, [serverUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-50 to-teal-200 px-4 py-10">

      <div className="bg-white p-6 sm:p-8 rounded-3xl w-full max-w-md shadow-md border border-emerald-200">

        {/* PROFILE IMAGE */}

        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl font-bold">
          {doctor?.username?.charAt(0).toUpperCase()}
        </div>

        {/* NAME */}

        <div className="text-center mt-4">

          <h2 className="text-2xl font-bold text-gray-800">
            Dr. {doctor?.username}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {doctor?.email}
          </p>

        </div>

        {/* ================= EXTRA INFO ================= */}

        {
          doctor?.specialization && (
            <div className="mt-6 space-y-4">

              <div className="bg-emerald-50 p-3 rounded-xl">
                <p className="text-sm text-gray-500">
                  Specialization
                </p>

                <h3 className="font-semibold text-gray-800">
                  {doctor?.specialization}
                </h3>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl">
                <p className="text-sm text-gray-500">
                  Experience
                </p>

                <h3 className="font-semibold text-gray-800">
                  {doctor?.experience} Years
                </h3>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl">
                <p className="text-sm text-gray-500">
                  Hospital / Clinic
                </p>

                <h3 className="font-semibold text-gray-800">
                  {doctor?.hospital}
                </h3>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl">
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <h3 className="font-semibold text-gray-800">
                  {doctor?.location}
                </h3>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl">
                <p className="text-sm text-gray-500">
                  Consultation Fees
                </p>

                <h3 className="font-semibold text-gray-800">
                  ₹ {doctor?.fees}
                </h3>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl">
                <p className="text-sm text-gray-500">
                  Contact
                </p>

                <h3 className="font-semibold text-gray-800">
                  {doctor?.contact}
                </h3>
              </div>

            </div>
          )
        }

        {/* BUTTON */}

        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full mt-6 px-6 py-3 rounded-full text-white font-medium
          bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
          hover:shadow-2xl hover:-translate-y-1 transition"
        >
          {
            doctor?.specialization
              ? "Edit Info"
              : "Add Info"
          }
        </button>

      </div>

    </div>
  );
}

export default Profile;