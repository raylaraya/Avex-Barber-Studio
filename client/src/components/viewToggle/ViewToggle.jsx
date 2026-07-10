import React from "react";
import "./view-toggle.css";

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={`toggle-btn ${view === "list" ? "active" : ""}`}
        onClick={() => onViewChange("list")}
      >
        List View
      </button>
      <button
        className={`toggle-btn ${view === "calendar" ? "active" : ""}`}
        onClick={() => onViewChange("calendar")}
      >
        Calendar View
      </button>
    </div>
  );
};

export default ViewToggle;
