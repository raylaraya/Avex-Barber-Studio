import React, { useState, useEffect } from "react";
import Modal from "../ModalWindow/Modal";
import axios from "axios";
import moment from "moment";
import "./reschedule-modal.css";

const RescheduleModal = ({
  isOpen,
  onClose,
  appointment,
  onRescheduleSuccess,
}) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isOpen && appointment) {
      fetchAvailableSlots();
    }
  }, [isOpen, appointment]);

  // Fetch available time slots when modal opens
  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/appointments/timeslots/unbooked`,
      );

      // Filter slots to only show future dates
      const futureSlots = response.data.filter(
        (slot) => new Date(slot.date) > new Date(),
      );

      // Sort slots by date
      const sortedSlots = futureSlots.sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      );

      setAvailableSlots(sortedSlots);
      setError(null);
    } catch (err) {
      console.error("Error fetching available slots:", err);
      setError("Failed to load available time slots. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!selectedSlot || !appointment) return;

    try {
      setLoading(true);

      // Update the appointment with the new date
      const response = await axios.put(
        `${apiUrl}/appointments/${appointment._id}`,
        { date: selectedSlot.date, timeSlotId: selectedSlot._id },
        { withCredentials: true },
      );

      if (onRescheduleSuccess) {
        onRescheduleSuccess(response.data);
      }

      setError(null);
    } catch (err) {
      console.error("Error rescheduling appointment:", err);
      setError("Failed to reschedule appointment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Group available slots by date for better organization
  const groupedSlots = availableSlots.reduce((groups, slot) => {
    const date = moment(slot.date).format("YYYY-MM-DD");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(slot);
    return groups;
  }, {});

  if (!appointment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="reschedule-modal">
        <h2>Reschedule Appointment</h2>
        <p>
          Select a new date and time for your {appointment.service} appointment:
        </p>

        {loading && (
          <div className="loading">Loading available time slots...</div>
        )}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <div className="time-slot-selection">
            {Object.entries(groupedSlots).length === 0 ? (
              <p className="no-slots">
                No available time slots found. Please try again later.
              </p>
            ) : (
              Object.entries(groupedSlots).map(([date, slots]) => (
                <div key={date} className="date-group">
                  <h3>{moment(date).format("dddd, MMMM Do YYYY")}</h3>
                  <div className="time-slots">
                    {slots.map((slot) => (
                      <button
                        key={slot._id}
                        className={`time-slot ${selectedSlot?._id === slot._id ? "selected" : ""}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {moment(slot.date).format("h:mm a")}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="modal-actions">
          <button
            className="reschedule-action"
            onClick={handleReschedule}
            disabled={!selectedSlot || loading}
          >
            Confirm Reschedule
          </button>
          <button className="cancel-action" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RescheduleModal;
