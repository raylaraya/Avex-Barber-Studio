import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./login-form.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message

    try {
      await login(email, password);
      // Redirect the user or update the UI upon successful login
      console.log("Logged in successfully");
    } catch (error) {
      // Handle login error
      setError("Failed to log in. Please check your credentials.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
