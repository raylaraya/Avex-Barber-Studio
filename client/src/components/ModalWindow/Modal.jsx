// ModalComponent.jsx
import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./modal.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
