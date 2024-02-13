import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // For clickable dates
import "./time-grid.css";

const TimeGrid = ({ selectedService }) => {
  // Assuming `selectedService` is a prop that contains the information about the selected service
  // This could include the service's available times, among other things

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Here, fetch or compute the available times for the selected service
    // For demonstration, let's assume the service has specific available times
    // In a real application, you would likely fetch this data from a backend API
    if (selectedService) {
      const availableTimes = getAvailableTimesForService(selectedService);
      setEvents(availableTimes);
    }
  }, [selectedService]);

  // Dummy function to simulate fetching available times based on the selected service
  // Replace this with your actual logic to fetch or compute available times
  const getAvailableTimesForService = (service) => {
    // Example times, replace with actual data
    return [
      {
        title: "Available",
        start: "2024-02-10T10:00:00",
        end: "2024-02-10T11:00:00",
      },
      {
        title: "Available",
        start: "2024-02-10T13:00:00",
        end: "2024-02-10T14:00:00",
      },
      // Add more available times as needed
    ];
  };

  // Handle time slot click event
  const handleTimeSlotClick = (arg) => {};

  return (
    <div className="time-grid">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" // or "timeGridDay" for daily view
        height="90vh"
        events={events} // Use the state to dynamically update events
        headerToolbar={{
          left: "prev,next today",
          right: "timeGridDay,timeGridWeek",
        }}
        hiddenDays="[0]"
        slotDuration="00:30:00" // 30 minute time slots
        slotMinTime="08:00:00" // Calendar starts at 8am
        slotMaxTime="20:00:00" // Calendar ends at 7pm
        // Add more configuration as needed, e.g., event click handlers, etc.
      />
    </div>
  );
};

export default TimeGrid;
