import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar({ onLogout, email }) {
  return (
    <nav>
      <ul>
        <li><Link to="/HomePage">Home</Link></li>
        <li><Link to="/gallery">Gallery</Link></li> {/* Dodajemo putanju do galerije */}
        <li><button onClick={onLogout}>Logout</button></li>
        <li>
          <span>{email}</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
