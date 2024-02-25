import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // For clickable dates
import axios from "axios";
import moment from "moment";
import "./time-grid.css";

const TimeGrid = () => {
  const [events, setEvents] = useState([]);

  // Fetch available time slots from the backend
  const fetchAvailableTimeSlots = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/appointments/timeslots/unbooked"
      );
      const availableTimeSlots = response.data.map((slot) => ({
        id: slot._id,
        title: "Available", // Static title since specific service doesn't matter
        start: moment(slot.date).toISOString(), // Assuming your backend returns ISO strings
        end: moment(slot.date).add(30, "minutes").toISOString(),
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

  // Event click handler
  const handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault();
    alert(`You clicked on event with id: ${clickInfo.event.id}`);
    // Implement the booking logic or interaction here
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
    </div>
  );
};

export default TimeGrid;
