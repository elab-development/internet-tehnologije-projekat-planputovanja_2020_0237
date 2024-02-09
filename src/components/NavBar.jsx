import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import axios from "axios";

function NavBar({ token, setToken, userRole }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const authToken = window.sessionStorage.getItem('auth_token');
    console.log('Vrednost tokena iz sessionStorage:', authToken);
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

  return (
    <nav>
      {token && (
        <ul>
           {userRole === 1 && (
            <>
              <li><Link to="/admin/destinacija">Dodaj destinaciju</Link></li>
              <li><Link to="/admin/hotel">Obriši hotel</Link></li>
              <li><Link to="/admin/vizuelizacija">Statistika</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
          {userRole === 2 && (
            <>
              <li><Link to="/homepage">Home</Link></li>
              <li><Link to="/gallery">Galerija</Link></li>
              <li><Link to="/weather">Vreme</Link></li>
              <li><Link to="/about">O nama</Link></li>
              <li><Link to="/mojaputovanja">Moja putovanja</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
