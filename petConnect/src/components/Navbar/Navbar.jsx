import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">PetConnect</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link">Profile</Link>
          </li>
          <li className="navbar-item">
            <Link to="/calendar" className="navbar-link">Calendar</Link>
          </li>
          <li className="navbar-item">
            <Link to="/blog" className="navbar-link">Blog</Link>
          </li>
          <li className="navbar-item">
            <Link to="/recommendations" className="navbar-link">Recommendations</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;