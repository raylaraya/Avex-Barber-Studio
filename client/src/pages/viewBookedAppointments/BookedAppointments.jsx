import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AppointmentList from "../../components/appointmentList/AppointmentList";
import { useAuth } from "../../context/AuthContext";

const BookedAppointments = () => {
  return (
    <div className="appointments-page">
      <Navbar />
      <h1 className="appointments-calendar-header">YOUR BOOKINGS</h1>
      <AppointmentList />
      <Footer />
    </div>
  );
};

export default BookedAppointments;
