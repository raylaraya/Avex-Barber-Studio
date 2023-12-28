import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleClick = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-container">
          <img
            src="/AvexBarberLogo.PNG"
            alt="Avex Logo"
            className="logo-image"
          />
        </Link>
        <ul className={`navbar-menu ${isNavExpanded ? "expanded" : ""}`}>
          <li className="navbar-item">
            <Link to="/">HOME</Link>
          </li>
          <li className="navbar-item">
            <Link to="/appointments">APPOINTMENTS</Link>
          </li>
          <li className="navbar-item">
            <Link to="/gallery">GALLERY</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about">ABOUT</Link>
          </li>
        </ul>
        <Link to="/login" className="login-button">
          Login
        </Link>
        <div className="hamburger" onClick={handleClick}>
          {isNavExpanded ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
