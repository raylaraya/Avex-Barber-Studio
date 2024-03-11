import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const handleLogout = async () => {
    await logout();
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
            <Link to="/about">ABOUT</Link>
          </li>
        </ul>
        {user ? (
          <button onClick={handleLogout} className="login-button">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
        <div className="hamburger" onClick={handleClick}>
          {isNavExpanded ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
