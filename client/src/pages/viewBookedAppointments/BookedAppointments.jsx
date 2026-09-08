import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import BookedTimeGrid from "../../components/bookedTimeGrid/BookedTimeGrid";
import AppointmentList from "../../components/appointmentList/AppointmentList";
import ViewToggle from "../../components/viewToggle/ViewToggle";
import { useAuth } from "../../context/AuthContext";
import "./booked-appointments.css";

const BookedAppointments = () => {
  const [view, setView] = useState("list");
  const { user } = useAuth();

  const isEmployee = user?.role === "employee";

  return (
    <div className="appointments-page">
      <Navbar />
      <div className="appointments-container">
        <h1 className="appointments-header">Your Appointments</h1>

        {isEmployee && <ViewToggle view={view} onViewChange={setView} />}

        {view === "list" || !isEmployee ? (
          <AppointmentList />
        ) : (
          <BookedTimeGrid />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookedAppointments;
