import React from "react";
import "./servicesSection.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const services = [
  {
    title: "New Client Haircut",
    description:
      "Tailored haircut for first time visitors. We take extra time to understand your style preferences.",
    price: "$40",
    imageUrl: "/shop.jpeg",
  },
  {
    title: "Haircut",
    description:
      "Full service haircut with a shape up and eyebrows done if desired from one of our experienced barbers. Styled and finished to perfection. ",
    price: "$35",
    imageUrl: "/haircut.JPG",
  },
  {
    title: "Haircut with Enhancements",
    description:
      "Full service haircut including a shape up and eyebrows along with additional enhancements for a sharp, defined look.",
    price: "$40",
    imageUrl: "/enhancements.JPG",
  },
  {
    title: "Haircut & Beard",
    description:
      "Complete grooming with a haircut and a beard trim, shaping your beard to your liking.",
    price: "$40",
    imageUrl: "beard.JPG",
  },
];

const ServiceCard = ({ title, description, price, imageUrl }) => (
  <div className="service-card">
    <img src={imageUrl} alt="{image}" className="service-image" />
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="service-footer">
      <span className="service-price">{price}</span>
      <Link to="appointments" className="service-card-button">
        BOOK NOW
        <FaArrowRight />
      </Link>
    </div>
  </div>
);

const ServicesSection = () => {
  return (
    <div className="services-section">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          price={service.price}
          imageUrl={service.imageUrl}
        />
      ))}
    </div>
  );
};

export default ServicesSection;
