import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const BookedTimeGrid = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchBookedAppointments = async () => {
    if (!user) return;

    try {
      const endpoint = `${apiUrl}/appointments`;

      const response = await axios.get(endpoint, { withCredentials: true });
      const bookedAppointments = response.data.map((appointment) => ({
        id: appointment._id,
        title: `${appointment.service} - ${appointment.clientName || "Client"}`, // Example title
        start: appointment.date,
        end: new Date(
          new Date(appointment.date).getTime() + 30 * 60000
        ).toISOString(), // Adjust according to your appointment length
        classNames: ["booked-event"], // Optional: Add specific classes for styling
      }));
      setEvents(bookedAppointments);
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
    }
  };

  useEffect(() => {
    fetchBookedAppointments();
  }, [user]); // Re-fetch when the user changes

  return (
    <div className="time-grid">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="90vh"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          right: "timeGridDay,timeGridWeek",
        }}
        hiddenDays={[0]}
        slotDuration="00:30:00"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
      />
    </div>
  );
};

export default BookedTimeGrid;
