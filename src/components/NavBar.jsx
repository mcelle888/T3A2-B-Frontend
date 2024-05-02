import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/M.png";
import "../css/Nav.css";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="navBar">
        <div className="navbar-top">
          <Link to="/home">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className={`hamburger-icon ${isMenuOpen ? "active" : ""}`}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </div>
        <div
          id="menu"
          className={`navbar-menu ${isMenuOpen ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <Link to="/home" className="navbarItem">
              Home
            </Link>
            <Link to="/details" className="navbarItem">
              Details
            </Link>
            <Link to="/rsvp" className="navbarItem">
              RSVP
            </Link>
            <Link to="/responses" className="navbarItem">
              Manage
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
