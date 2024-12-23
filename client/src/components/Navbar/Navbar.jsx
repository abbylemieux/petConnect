import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <i className="fas fa-paw"></i>
          <span>PetConnect</span>
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/services">Services</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;