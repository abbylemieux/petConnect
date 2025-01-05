import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import whitePaw from '../../assets/White_paw_print.png';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <img src={whitePaw} alt="PetConnect Logo" />
          <span className="logo-text">PetConnect</span>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={menuOpen ? 'show' : ''}>
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
