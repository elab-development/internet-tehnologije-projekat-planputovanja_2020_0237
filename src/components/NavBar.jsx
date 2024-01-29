// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar({ onLogout, email }) {
  const handleLogout = () => {
    if (typeof onLogout === 'function') { // Provera da li je onLogout funkcija
      onLogout(); // Pozivamo funkciju za odjavljivanje
    } else {
      console.error('onLogout nije funkcija.');
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/HomePage">Home</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
        <li>
          <span>{email}</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
