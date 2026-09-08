import React from "react";
import Modal from "../ModalWindow/Modal";
import moment from "moment";
import "./cancel-modal.css";

const CancelModal = ({ isOpen, onClose, onConfirm, appointment }) => {
  if (!appointment) return null;

  const formattedDate = moment(appointment.date).format("dddd, MMMM Do YYYY");
  const formattedTime = moment(appointment.date).format("h:mm a");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="cancel-modal">
        <h2>Cancel Appointment</h2>
        <p>Are you sure you want to cancel your appointment?</p>

        <div className="appointment-summary">
          <p>
            <strong>Service:</strong> {appointment.service}
          </p>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Time:</strong> {formattedTime}
          </p>
        </div>

        <div className="modal-actions">
          <button className="cancel-action" onClick={onConfirm}>
            Yes, Cancel Appointment
          </button>
          <button className="keep-action" onClick={onClose}>
            No, Keep Appointment
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelModal;
