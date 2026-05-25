import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { serverUrl } = useContext(authDataContext);

    const getCurrentUser = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${serverUrl}/api/user/current-user`,
                { withCredentials: true }
            );

            setUserData(res.data);
        } catch (error) {
            setUserData(null);
            console.log("User not logged in");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.get(
                `${serverUrl}/api/auth/logout`,
                { withCredentials: true }
            );

            setUserData(null);
        } catch (error) {
            console.log("Logout error:", error);
        }
    };


    const refreshUser = async () => {
        await getCurrentUser();
    };

 
    useEffect(() => {
        getCurrentUser();
    }, []);

    const value = {
        userData,
        setUserData,
        getCurrentUser,
        logout,
        refreshUser,
        loading
    };

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    );
}

export default UserContext;