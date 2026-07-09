import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AppointmentCard from "../appointmentCard/AppointmentCard";
import CancelModal from "../cancelModal/CancelModal";
import RescheduleModal from "../rescheduleModal/RescheduleModal";
import "./appointment-list.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
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

        const sortedAppointments = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );

        setAppointments(sortedAppointments);
        setError(null);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, apiUrl]);

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const confirmCancel = async () => {
    if (!selectedAppointment) return;

    try {
      await axios.delete(`${apiUrl}/appointments/${selectedAppointment._id}`, {
        withCredentials: true,
      });

      setAppointments(
        appointments.filter((app) => app._id !== selectedAppointment._id),
      );

      setShowCancelModal(false);
      setSelectedAppointment(null);
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      setError("Failed to cancel appointment. Please try again later.");
    }
  };

  if (loading) return <div className="loading">Loading appointments...</div>;

  return (
    <div className="appointment-list">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          onCancel={handleCancel}
          onReschedule={handleReschedule}
        />
      ))}

      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        appointment={selectedAppointment}
      />

      <RescheduleModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        appointment={selectedAppointment}
        onRescheduleSuccess={(updatedAppointment) => {
          setAppointments(
            appointments.map((app) =>
              app._id === updatedAppointment._id ? updatedAppointment : app,
            ),
          );
          setShowRescheduleModal(false);
          setSelectedAppointment(null);
        }}
      />
    </div>
  );
};

export default AppointmentList;
