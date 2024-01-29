import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Gallery from './components/Gallery';
import Logout from './components/Logout';
import About from './components/About';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    // Preusmeravanje na login stranicu nakon odjave
    window.location.href = '/login';
  };
  const handleRegister = () => {
    setIsLoggedIn(true);
    setEmail('');
    // Preusmeravanje na login stranicu nakon registracije
    window.location.href = '/login';
  };


  return (
    <Router>
      <div className="App">
        {isLoggedIn && <NavBar onLogout={handleLogout} email={email} />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/homepage" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
