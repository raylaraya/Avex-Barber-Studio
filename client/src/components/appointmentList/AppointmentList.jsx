import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import AppointmentCard from "../appointmentCard/AppointmentCard";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/appointments`, {
          withCredentials: true,
        });
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, apiUrl]);

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
    const date = moment(appointment.date).format("dddd, MMMM Do YYYY");
    console.log("Cancelled appointment for: ", date);
  };

  if (loading) return <div className="Loading">Loading appointments...</div>;

  console.log("showCancelModal is now:", showCancelModal);

  return (
    <div className="appointment-list">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
