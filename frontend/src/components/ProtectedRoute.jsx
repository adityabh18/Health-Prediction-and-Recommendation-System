import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

function ProtectedRoute({ children, allowedRoles }) {
    const { userData, loading } = useContext(userDataContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    if (!userData) {
        return <Navigate to="/signin" replace />;
    }


    if (allowedRoles && !allowedRoles.includes(userData.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;