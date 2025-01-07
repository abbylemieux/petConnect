import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import whitePaw from '../../assets/White_paw_print.png';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <nav>
          <div className="logo">
            <img src={whitePaw} alt="PetConnect Logo" />
            <span className="logo-text">PetConnect</span>
          </div>
          <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/recommendations">Recommendations</Link></li>
          </ul>
          <button className="sign-in-btn" onClick={openModal}>Sign In</button>
          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>
        </nav>
      </header>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Sign In</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button className="submit-btn">Sign In</button>
            <button className="cancel-btn" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
