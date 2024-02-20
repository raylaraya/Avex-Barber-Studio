import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // For clickable dates
import "./time-grid.css";

const TimeGrid = ({ selectedService }) => {
  // Assuming `selectedService` is a prop that contains the information about the selected service
  // This could include the service's available times, among other things

  // Dummy data for available appointment slots
  const initialEvents = [
    {
      id: 1,
      title: "Book Now",
      start: "2024-02-14T10:00:00",
      end: "2024-02-14T10:30:00",
    },
    {
      id: 2,
      title: "Haircut",
      start: "2024-02-14T10:30:00",
      end: "2024-02-14T11:00:00",
    },
    {
      id: 3,
      title: "Haircut",
      start: "2024-02-14T11:00:00",
      end: "2024-02-14T11:30:00",
    },
    {
      id: 4,
      title: "Haircut",
      start: "2024-02-14T11:30:00",
      end: "2024-02-14T12:00:00",
    },
    {
      id: 5,
      title: "Haircut",
      start: "2024-02-14T12:30:00",
      end: "2024-02-14T13:00:00",
    },
    {
      id: 6,
      title: "Haircut",
      start: "2024-02-14T13:00:00",
      end: "2024-02-14T13:30:00",
    },

    // More events...
  ];

  const [events, setEvents] = useState(initialEvents);

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <button onClick={() => handleEventClick(eventInfo)}>
          {eventInfo.timeText}
        </button>
      </>
    );
  };

  // Event click handler
  const handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault(); // Prevent the calendar's default click behavior

    // Implement booking logic here
    alert(`You clicked on event with id: ${clickInfo.event.id}`);
  };

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
        initialView="timeGridWeek"
        height="90vh"
        events={events} // Use the state to dynamically update events
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          right: "timeGridDay,timeGridWeek",
        }}
        hiddenDays="[0]" // Hide Sundays
        slotDuration="00:30:00"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
      />
    </div>
  );
};

// const [events, setEvents] = useState([]);

// // Fetch booked time slots from the backend
// const fetchBookedTimeSlots = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/api/timeslots/booked');
//     const bookedTimeSlots = response.data.map(slot => ({
//       id: slot._id,
//       title: slot.service, // Assuming you have a service field
//       start: slot.startTime, // Make sure this is a full ISO date string
//       end: moment(slot.startTime).add(30, 'minutes').toISOString(), // Add 30 minutes to start time
//       // You might need additional fields here depending on your exact requirements
//     }));
//     setEvents(bookedTimeSlots);
//   } catch (error) {
//     console.error("Error fetching booked time slots:", error);
//   }
// };

// useEffect(() => {
//   if (selectedService) {
//     fetchBookedTimeSlots();
//   }
// }, [selectedService]);

// // Event click handler
// const handleEventClick = (clickInfo) => {
//   clickInfo.jsEvent.preventDefault();
//   alert(`You clicked on event with id: ${clickInfo.event.id}`);
//   // Implement the booking logic or interaction here
// };

// return (
//   <div className="time-grid">
//     <FullCalendar
//       plugins={[timeGridPlugin, interactionPlugin]}
//       initialView="timeGridWeek"
//       height="90vh"
//       events={events}
//       eventClick={handleEventClick}
//       headerToolbar={{
//         left: "prev,next today",
//         right: "timeGridDay,timeGridWeek",
//       }}
//       hiddenDays={[0]} // Hide Sundays
//       slotDuration="00:30:00"
//       slotMinTime="08:00:00"
//       slotMaxTime="20:00:00"
//     />
//   </div>
// );
// };

export default TimeGrid;
