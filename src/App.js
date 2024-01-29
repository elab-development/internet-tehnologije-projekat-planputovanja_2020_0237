import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Gallery from './components/Gallery';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(''); // Dodajte stanje za email korisnika

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setEmail(email); // Postavite email u stanje nakon prijave
    console.log(`Prijavljen korisnik: ${email}`);
    // Dodajte kod koji želite izvršiti nakon prijave
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail(''); // Resetujte email nakon odjave
    // Dodajte kod koji želite izvršiti nakon odjave
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <NavBar onLogout={handleLogout} email={email} />} {/* Prikazuje NavBar samo ako je korisnik ulogovan */}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
