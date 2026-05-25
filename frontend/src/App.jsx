import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { socket } from "./socket/socket";
import { toast } from "react-toastify";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Service from "./pages/Services";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Prediction from "./pages/Prediction";
import Login from "./pages/Login";
import SelectRole from "./pages/SelectRole";

// Dashboards
import UserDashboard from "./dashboards/users/UserDashboard";
import DoctorDashboard from "./dashboards/doctors/DoctorDashboard";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import SymptomChecker from "./pages/SymptomChecker";
import HeartCheck from "./pages/HeartCheck";
import DiabetesPredictor from "./pages/DiabetesPredictor";
import KidneyPredictor from "./pages/KidneyPredictor";
import PredictionResult from "./components/PredictionResult";
import EditProfile from "./dashboards/doctors/components/EditProfile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./dashboards/users/components/Appointments";
import Chat from "./pages/chat/Chat";

function App() {
  const navigate = useNavigate();

 
  useEffect(() => {
    const handleMessage = (data) => {
      toast.info(`📩 ${data.senderName}: ${data.message}`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClick: () => {
          navigate(`/chat/${data.appointmentId}`);
        },
      });
    };

    socket.on("new_message_notification", handleMessage);

    return () => {
      socket.off("new_message_notification", handleMessage);
    };
  }, [navigate]);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/prediction-result" element={<PredictionResult />} />
      <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/chat/:appointmentId" element={<Chat />} />

      {/* PROTECTED USER ROUTES */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* PROTECTED DOCTOR ROUTES */}
      <Route
        path="/doctor-dashboard"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      {/* COMMON PROTECTED ROUTES */}
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Service />
          </ProtectedRoute>
        }
      />

      <Route
        path="/prediction"
        element={
          <ProtectedRoute>
            <Prediction />
          </ProtectedRoute>
        }
      />

      <Route
        path="/symptom-checker"
        element={
          <ProtectedRoute>
            <SymptomChecker />
          </ProtectedRoute>
        }
      />

      <Route
        path="/heart-risk"
        element={
          <ProtectedRoute>
            <HeartCheck />
          </ProtectedRoute>
        }
      />

      <Route
        path="/diabetes"
        element={
          <ProtectedRoute>
            <DiabetesPredictor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kidney"
        element={
          <ProtectedRoute>
            <KidneyPredictor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute allowedRoles={["user", "doctor"]}>
            <EditProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;