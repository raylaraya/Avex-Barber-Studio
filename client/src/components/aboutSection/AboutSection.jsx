import React from "react";
import "./about-section.css";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        <img src="/shop.jpeg" alt="Barbershop" className="about-image" />
        <div className="about-content">
          <h2>About Avex Barber Studio</h2>
          <p>
            Welcome to Avex Barber Studio! Located at 33 White Horse Avenue in
            Hamilton, New Jersey, our barbershop was brought to life in November
            2022 through the passion and ambition of our owner, Vinny Santiago.
            Vinny is not only highly skilled and dedicated to his craftsmanship
            but also dedicated to building lasting relationships with his
            clients and giving back to the community.{" "}
          </p>
          <p>
            For more information on Avex Barber Studio and its owner press the
            button below.
          </p>
          <Link to="/about" className="about-button">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
