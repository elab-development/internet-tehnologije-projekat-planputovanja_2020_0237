import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Gallery from './components/Gallery';
import About from './components/About';
import PlanPutovanja from './components/PlanPutovanja';
import MojaPutovanja from './components/MojaPutovanja';
import WeatherApi from './components/WeatherApi';
import Footer from './components/Footer';

function App() {
  
  const [token, setToken] = useState();

  function addToken(auth_token) {
    setToken(auth_token);
  }
  


  return (
    <Router>
      <div className="App">
      <NavBar token={token} setToken={setToken} />
        <Routes>
          <Route path="/login" element={<Login addToken={addToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/weather" element={<WeatherApi />} />
          <Route path="/planputovanja" element={<PlanPutovanja />} />
          <Route path="/mojaputovanja" element={<MojaPutovanja />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
