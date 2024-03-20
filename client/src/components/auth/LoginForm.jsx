import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login-form.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message
    setSuccess(false);

    try {
      await login(email, password);
      console.log("Logged in successfully");
      setSuccess(true);
      setTimeout(() => navigate("/appointments"), 1000);
    } catch (error) {
      // Handle login error
      setError("Failed to log in. Please check your credentials.");
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
        {success && <div style={{ color: "green" }}>WELCOME BACK!</div>}
      </form>
    </div>
  );
};

export default LoginForm;
