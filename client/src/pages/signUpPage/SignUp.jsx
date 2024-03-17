import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SignUpForm from "../../components/auth/SignUpForm";
import "./signup.css";

const SignUp = () => {
  return (
    <div className="login-page">
      <Navbar />
      <h1>WELCOME</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
