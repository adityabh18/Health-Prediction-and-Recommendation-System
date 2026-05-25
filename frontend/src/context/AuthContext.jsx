import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "https://health-prediction-and-recommendation-8bqr.onrender.com";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/current-user`,
          { withCredentials: true }
        );

        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <authDataContext.Provider value={{ serverUrl, user, setUser, loading }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
