import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkLoggedIn = async () => {
      try {
        // Endpoint to verify the user based on the auth cookie
        const { data } = await axios.get("/users/verify", {
          withCredentials: true,
        });
        setUser(data); // Assuming the response includes user data
      } catch (error) {
        console.error("Not logged in");
        setUser(null); // Ensure user state is cleared if not logged in
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(data); // Update user state with the logged-in user's data
    } catch (error) {
      console.error("Login failed:", error.response.data.msg);
      // Handle login error (e.g., show an error message)
      throw error; // Rethrow to handle it in the login component, e.g., to show an error message
    }
  };

  const logout = async () => {
    try {
      // Assuming your backend provides a logout endpoint that clears the auth cookie
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setUser(null); // Clear the user state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
