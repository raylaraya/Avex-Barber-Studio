import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./signup-form.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "client", // Default role selection
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      formData.role === "client"
        ? "/auth/register/client"
        : "/auth/register/employee";

    try {
      await axios.post(`${apiUrl}${endpoint}`, formData);
      await login(formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => navigate("/appointments"), 2000);
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed:", error.response.data.error);
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="client">Client</option>
          <option value="employee">Employee</option>
        </select>
        <button type="submit">Sign Up</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && (
          <div style={{ color: "green" }}>
            Registration successful! Redirecting...
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
