import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import moment from "moment";
import Modal from "../ModalWindow/Modal";
import ServicesSection from "../servicesSection/servicesSection";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./time-grid.css";

const TimeGrid = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch available time slots from the backend
  const fetchAvailableTimeSlots = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/appointments/timeslots/unbooked"
      );
      const availableTimeSlots = response.data.map((slot) => ({
        id: slot._id,
        title: "Available",
        start: moment(slot.date).toISOString(),
        end: moment(slot.date).add(30, "minutes").toISOString(),
        classNames: ["bookable-event"],
      }));
      setEvents(availableTimeSlots);
      console.log(response.data);
      console.log(availableTimeSlots);
    } catch (error) {
      console.error("Error fetching available time slots:", error);
    }
  };

  useEffect(() => {
    fetchAvailableTimeSlots();
  }, []);

  const handleEventClick = ({ event }) => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      navigate(`/appointments/book?date=${event.startStr}`);
    }
  };

  return (
    <div className="time-grid">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="90vh"
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          right: "timeGridDay,timeGridWeek",
        }}
        hiddenDays={[0]} // Hide Sundays
        slotDuration="00:30:00"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {!user ? (
          <div>
            <p>You must be logged in to book an appointment.</p>
            <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link>
          </div>
        ) : (
          <ServicesSection />
        )}
      </Modal>
    </div>
  );
};

export default TimeGrid;
