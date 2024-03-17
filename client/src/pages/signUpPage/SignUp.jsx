import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SignUpForm from "../../components/auth/SignUpForm";
import "./signup.css";

const SignUp = () => {
  return (
    <div className="login-page">
      <Navbar />
      <h1>WELCOME</h1>
      <div className="signup-form-container">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
