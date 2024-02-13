import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import TimeGrid from "../../components/timeGrid/TimeGrid";
import "./appointments.css";

const Appointments = () => {
  return (
    <div className="appointments-page">
      <Navbar />
      <h1 className="appointments-calendar-header">SELECT A DATE & TIME</h1>
      <TimeGrid />
      <Footer />
    </div>
  );
};

export default Appointments;
