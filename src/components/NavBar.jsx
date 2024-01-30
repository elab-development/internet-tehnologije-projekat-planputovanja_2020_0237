// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import '../css/NavBar.css';
import axios from "axios"

function NavBar({token}) {
  
  let navigate=useNavigate();
  function handleLogout(){
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/logout',
      headers: { 
        'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token"), 
      },
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      window.sessionStorage.setItem("auth_token",null);
    })
    .catch((error) => {
      console.log(error);
    });
    navigate("/login");

  };

  return (
    <nav>
    {token ? (
      <ul>
        <li><Link to="/homepage">Home</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    ) : (
      <p>NavBar nije prikazan. Token: {token}</p>
    )}
  </nav>
  );
}

export default NavBar;
