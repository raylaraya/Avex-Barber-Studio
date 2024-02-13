import React, { useEffect } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-list">
          <img src="/vinnyLogo.webp" alt="" className="footer-image" />
          <a
            href="https://www.instagram.com/vinnysantiago_/?hl=en"
            className="social-link"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="footer-list">
          <h4>EXPLORE</h4>
          <Link to="/">HOME</Link>
          <Link to="/appointments">APPOINTMENTS</Link>
          <Link to="/gallery">GALLERY</Link>
          <Link to="/about">ABOUT</Link>
        </div>
        <div className="footer-list">
          <h4>CONTACT US</h4>
          <p>Vinny Santiago</p>
          <p>
            <TfiLocationPin /> 33 White Horse Ave, Hamilton, New Jersey 08610
          </p>
          <p>
            <FiPhone /> 609-516-0026
          </p>
          <p>
            <AiOutlineClockCircle /> MON-WED: 8:30AM - 6:30PM
          </p>
          <p>
            <AiOutlineClockCircle /> THURS-SAT: 8AM - 7PM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
