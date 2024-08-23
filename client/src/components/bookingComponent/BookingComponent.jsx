import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import moment from "moment";
import Modal from "../ModalWindow/Modal";
import "./booking-component.css";

const services = [
  {
    id: 1,
    title: "New Client Haircut",
    description:
      "Tailored haircut for first time visitors. We take extra time to understand your style preferences.",
    price: 40,
  },
  {
    id: 2,
    title: "Haircut",
    description:
      "Full service haircut with a shape up and eyebrows done if desired from one of our experienced barbers. Styled and finished to perfection. ",
    price: 35,
  },
  {
    id: 3,
    title: "Haircut with Enhancements",
    description:
      "Full service haircut including a shape up and eyebrows along with additional enhancements for a sharp, defined look.",
    price: 40,
  },
  {
    id: 4,
    title: "Haircut & Beard",
    description:
      "Complete grooming with a haircut and a beard trim, shaping your beard to your liking.",
    price: 40,
  },
];

const BookingComponent = () => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const bookAppointment = async () => {
    if (!user || !selectedService) {
      console.log("User is not logged in or service is not selected");
      return;
    }
    try {
      await axios.post(
        `${apiUrl}/appointments`,
        {
          client: user._id, // Assuming user._id is available
          employee: "656679b739ca6e7cc5a7e59a", // Hardcoded employee ID
          date,
          price: selectedService.price,
          service: selectedService.title,
        },
        { withCredentials: true }
      );
      console.log("Booking successful");
      setModalContent(
        <p>
          Your appointment for {selectedService.title} on{" "}
          {moment(date).format("dddd, MMMM Do YYYY, h:mm a")} has been
          successfully booked!
        </p>
      );
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/appointments");
      }, 3000); // Close modal and navigate after 3 seconds
    } catch (error) {
      console.error("Booking failed", error);
    }
  };

  return (
    <div className="booking-container">
      <h2>
        Select a service for:{" "}
        {moment(date).format("dddd, MMMM Do YYYY, h:mm a")}
      </h2>
      {services.map((service) => (
        <div key={service.id} className="service-option">
          <label>
            <input
              type="radio"
              name="service"
              value={service.id}
              onChange={() => setSelectedService(service)}
            />
            {service.title} - ${service.price}
            <p className="service-description">{service.description}</p>
          </label>
        </div>
      ))}
      <button
        className="book-button"
        disabled={!selectedService}
        onClick={bookAppointment}
      >
        BOOK
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/appointments");
        }}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default BookingComponent;
