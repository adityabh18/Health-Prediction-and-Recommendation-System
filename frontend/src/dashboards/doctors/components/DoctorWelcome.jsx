import React, { useContext, useEffect, useState } from "react";
import {
  FaUsers,
  FaNotesMedical,
  FaCalendarCheck,
} from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../../../context/AuthContext";

function DoctorWelcome({ setActiveTab }) {
  const { serverUrl } = useContext(authDataContext);

  const [doctor, setDoctor] = useState(null);
  const [stats, setStats] = useState({
    totalPatients: 0,
    highRiskPatients: 0,
    todayAppointments: 0,
  });


  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/current-user`,
          { withCredentials: true }
        );
        setDoctor(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctor();
  }, [serverUrl]);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/doctor/dashboard-stats`,
          { withCredentials: true }
        );
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, [serverUrl]);


  const statsCards = [
    {
      title: "Total Patients",
      value: stats.totalPatients,
      icon: <FaUsers />,
      tab: "patients",
    },
    {
      title: "High Risk Patients",
      value: stats.highRiskPatients,
      icon: <FaNotesMedical />,
      tab: "highRisk",
    },
    {
      title: "Today Appointments",
      value: stats.todayAppointments,
      icon: <FaCalendarCheck />,
      tab: "appointments",
    },
  ];

  return (
    <div className="w-full min-h-screen px-4 py-10 bg-gradient-to-r from-emerald-50 via-white to-emerald-100">

      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Welcome{" "}
          <span className="text-emerald-600">
            Dr. {doctor?.username || "Doctor"}
          </span>
        </h2>

        <p className="text-gray-500 mt-2">
          AI Powered Medical Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {statsCards.map((item, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(item.tab)} 
            className="
              bg-white p-6 rounded-3xl shadow-md border border-emerald-200
              text-center cursor-pointer
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-300
            "
          >
            <div className="text-3xl text-emerald-600 flex justify-center mb-2">
              {item.icon}
            </div>

            <h3 className="text-gray-600 font-semibold">
              {item.title}
            </h3>

            <p className="text-2xl font-bold text-emerald-600 mt-2">
              {item.value}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default DoctorWelcome;