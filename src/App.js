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
import AdminPage from './admin/AdminPage';
import AdminDestinacija from './admin/AdminDestinacija';
import AdminHotel from './admin/AdminHotel';
import HotelCountVisualization from './admin/HotelCountVisualization';

function App() {
  
  const [token, setToken] = useState();
  const [userRole, setUserRole] = useState();

  function addToken(auth_token, role) {
    setToken(auth_token);
    setUserRole(role);
  }
  return (
    <Router>
      <div className="App">
        <NavBar token={token} setToken={setToken} userRole={userRole} />
        <Routes>
          <Route path="/login" element={<Login addToken={addToken} />} />
          <Route path="/register" element={<Register />} />
          {userRole === 1 && (
            <>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/destinacija" element={<AdminDestinacija />} />
              <Route path="/admin/hotel" element={<AdminHotel />} />
              <Route path="/admin/vizuelizacija" element={<HotelCountVisualization />}/>
            </>
          )}
          {userRole === 2 && <Route path="/homepage" element={<HomePage />} />}
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
