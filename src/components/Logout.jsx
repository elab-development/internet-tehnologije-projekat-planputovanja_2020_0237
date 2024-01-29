import React from 'react';
import { Link } from 'react-router-dom';

function Logout({ onLogout }) {
  const handleLogout = () => {
    onLogout(); // Poziv funkcije za odjavu koja se prosleđuje kao prop
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
