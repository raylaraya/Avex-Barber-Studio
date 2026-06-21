import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import TimeGrid from "../../components/timeGrid/TimeGrid";
import BookedTimeGrid from "../../components/bookedTimeGrid/BookedTimeGrid";
import AppointmentList from "../../components/appointmentList/AppointmentList";
import { useAuth } from "../../context/AuthContext";

const BookedAppointments = () => {
  return (
    <div className="appointments-page">
      <Navbar />
      <h1 className="appointments-calendar-header">YOUR BOOKINGS</h1>
      {/* <TimeGrid /> */}
      <AppointmentList />
      <Footer />
    </div>
  );
};

export default BookedAppointments;
