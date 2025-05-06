import React from "react";
import moment from "moment";
import "./appointment-card.css";

const AppointmentCard = ({ appointment, onCancel, onReschedule }) => {
  const formattedDate = moment(appointment.date).format("dddd, MMMM Do YYYY");
  const formattedTime = moment(appointment.date).format("h:mm a");

  return (
    <div className="appointment-card">
      <div className="appointment-info">
        <h3>{appointment.service}</h3>
        <div className="appointment-details">
          <p className="appointment-date">{formattedDate}</p>
          <p className="appointment-time">{formattedTime}</p>
          <p className="appointment-price">{appointment.price}</p>
        </div>
      </div>
      <div className="appointment-actions">
        <button
          className="reschedule-btn"
          onClick={() => onReschedule(appointment)}
        >
          Reschedule
        </button>
        <button className="cancel-btn" onClick={() => onCancel(appointment)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
