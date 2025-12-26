import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Pokémon
        </NavLink>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={toggleMenu}
            >
              Pokemon
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/trainers"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={toggleMenu}
            >
              Trainers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/supporters"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={toggleMenu}
            >
              Supporters
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/grounds"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={toggleMenu}
            >
              Grounds
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/leagues"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={toggleMenu}
            >
              Leagues
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/badges"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={toggleMenu}
            >
              Badges
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
