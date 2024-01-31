// NavBar.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import axios from "axios";

function NavBar({ token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Prilikom montiranja komponente, postavi token iz sessionStorage
    const authToken = window.sessionStorage.getItem('auth_token');
    setToken(authToken);
  }, [setToken]);

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
      setToken(null);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  // Uslovno prikazivanje na osnovu tokena
  return (
    <nav>
      {token && (
        <ul>
          <li><Link to="/homepage">Home</Link></li>
          <li><Link to="/gallery">Galerija</Link></li>
          <li><Link to="/about">O nama</Link></li>
          <li><Link to="/mojaputovanja">Moja putovanja</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
