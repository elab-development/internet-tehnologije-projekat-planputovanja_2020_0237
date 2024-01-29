import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/HomePage.css';
//import NavBar from './NavBar'; // Dodajemo import NavBar komponente

function HomePage() {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState('');

  const handleDestinationChange = (e) => setDestination(e.target.value);
  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setBudget(value);
    }
  };
  const handleStartDateChange = (date) => setStartDate(date);
  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setDuration(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (duration < 0 || budget < 0) {
      alert('Trajanje putovanja i budžet ne mogu biti manji od nule.');
      return;
    }
    console.log('Destination:', destination);
    console.log('Budget:', budget);
    console.log('Start Date:', startDate);
    console.log('Duration:', duration);
    // Ovde možete implementirati logiku za obradu podataka
  };

  return (
    <div className="home-page">
      {/* Dodajemo prikaz Navbar-a samo ako je korisnik prijavljen */}
      <h2>Planiranje Putovanja</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Destinacija:</label>
          <select value={destination} onChange={handleDestinationChange}>
            <option value="">Izaberite destinaciju...</option>
            <option value="paris">Pariz</option>
            <option value="rome">Rim</option>
            <option value="london">London</option>
            {/* Dodajte ostale destinacije prema potrebi */}
          </select>
        </div>
        <div>
          <label>Budžet:</label>
          <input type="number" value={budget} onChange={handleBudgetChange} />
        </div>
        <div>
          <label>Datum polaska:</label>
          <DatePicker selected={startDate} onChange={handleStartDateChange} minDate={new Date()} />
        </div>
        <div>
          <label>Trajanje putovanja (u danima):</label>
          <input type="number" value={duration} onChange={handleDurationChange} />
        </div>
        <button type="submit">Planiraj Putovanje</button>
      </form>
    </div>
  );
}

export default HomePage;

