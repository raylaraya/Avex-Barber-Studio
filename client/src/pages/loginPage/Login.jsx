import React from "react";
import Navbar from "../../components/navbar/Navbar";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="login-page">
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default Login;
