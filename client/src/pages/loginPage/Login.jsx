import React from "react";
import Navbar from "../../components/navbar/Navbar";
import LoginForm from "../../components/auth/LoginForm";
import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
      <Navbar />
      <h1>LOG IN</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
