import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/AvexBarberLogo.PNG" alt="Avex Logo" className="logo-image" />
      </div>
      <ul className={`navbar-menu ${isNavExpanded ? "expanded" : ""}`}>
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/services">Services</Link>
        </li>
        <li className="navbar-item">
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className="navbar-item">
          <Link to="/gallery">Gallery</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about">About</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <div
        className="hamburger"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        {isNavExpanded ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
