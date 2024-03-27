import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import BookingComponent from "../../components/bookingComponent/BookingComponent";
import "./booking.css";

const Booking = () => {
  return (
    <div className="booking-page">
      <Navbar />
      <BookingComponent />
      <Footer />
    </div>
  );
};

export default Booking;
