// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import '../css/NavBar.css';
import axios from "axios"

function NavBar({token}) {
  
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const authToken = window.sessionStorage.getItem('auth_token');
      const config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/logout',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await axios(config);
      window.sessionStorage.setItem('auth_token', null);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
    {token ? (
      <ul>
        <li><Link to="/homepage">Home</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/mojaputovanja">Moja putovanja</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    ) : (
      <p>NavBar nije prikazan. Token: {token}</p>
    )}
  </nav>
  );
}

export default NavBar;
