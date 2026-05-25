import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";


import UserDashboard from "../dashboards/users/UserDashboard";
import DoctorDashboard from "../dashboards/doctor/DoctorDashboard";

function RoleBasedHome() {
  const { userData } = useContext(userDataContext);

  
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }


  return userData.role === "doctor" ? (
    <DoctorDashboard />
  ) : (
    <UserDashboard />
  );
}

export default RoleBasedHome;