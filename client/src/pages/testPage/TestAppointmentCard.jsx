import React from "react";
import AppointmentCard from "../../components/appointmentCard/AppointmentCard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const TestAppointmentCard = () => {
  const sampleAppointment = {
    _id: "123456789",
    service: "Haircut",
    date: new Date("2025-05-15T14:30:00"),
    price: "$35",
  };

  const handleCancel = (appointment) => {
    console.log("Cancel appointment:", appointment);
  };

  const handleReschedule = (appointment) => {
    console.log("Reschedule appointment:", appointment);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}
      >
        <h1>Test AppointmentCard Component</h1>

        <h2>Single Appointment Card</h2>
        <AppointmentCard
          appointment={sampleAppointment}
          onCancel={handleCancel}
          onReschedule={handleReschedule}
        />

        <h2>Multiple Appointment Cards</h2>
        {/* Testing with multiple appointments */}
        {[
          { ...sampleAppointment, _id: "1", service: "Haircut", price: "$35" },
          {
            ...sampleAppointment,
            _id: "2",
            service: "Haircut and beard",
            price: "$40",
            date: new Date("2025-05-16T10:00:00"),
          },
          {
            ...sampleAppointment,
            _id: "3",
            service: "New Client Haircut",
            price: "$40",
            date: new Date("2025-05-17T16:00:00"),
          },
        ].map((appointment) => (
          <div key={appointment._id} style={{ marginBottom: "20px" }}>
            <AppointmentCard
              appointment={appointment}
              onCancel={handleCancel}
              onReschedule={handleReschedule}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default TestAppointmentCard;
