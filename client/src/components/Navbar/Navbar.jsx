import React from 'react';
import { Link } from 'react-router-dom';
import whitePaw from '../../assets/White_paw_print.png'
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <i className="fas fa-paw"></i>
          <img 
            src={whitePaw} 
            alt="PetConnect Logo" 
            className="w-4 h-4 object-contain"
          />
          <span className="logo-text">PetConnect</span>
        </div>
        <ul>
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