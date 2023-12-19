import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // We'll use inline styles to add or remove the transition effect
  const navbarMenuStyle = {
    transform: isNavExpanded ? "translateX(0)" : "translateX(-100%)",
    // We only want the transition to apply when the menu state changes, not on initial render
    transition: isNavExpanded !== null ? "transform 0.5s ease-out" : "none",
  };

  const toggleNav = () => {
    setIsNavExpanded((prevExpand) => !prevExpand);
  };

  // const toggleNav = () => {
  //   if (!isNavExpanded) {
  //     // Enable the animation when expanding the menu
  //     navbarMenuRef.current.classList.add("animate");
  //   } else {
  //     // Remove the animation when collapsing the menu
  //     // The transition will still occur due to teh existing CSS rules
  //     setTimeout(() => {
  //       navbarMenuRef.current.classList.remove("animate");
  //     }, 500);
  //   }
  //   setIsNavExpanded(!isNavExpanded);
  // };

  // This effect runs once on mount and unmount
  // useEffect(() => {
  //   return () => {
  //     if (navbarMenuRef.current) {
  //       navbarMenuRef.current.classList.remove("animate");
  //     }
  //   };
  // }, []);

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
        <ul className="navbar-menu" style={navbarMenuStyle}>
          <li className="navbar-item">
            <Link to="/">HOME</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services">SERVICES</Link>
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
          <li className="navbar-item">
            <Link to="/contact">CONTACT</Link>
          </li>
        </ul>
        <Link to="/appointments" className="book-button">
          BOOK
        </Link>
        <div className="hamburger" onClick={toggleNav}>
          {isNavExpanded ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
