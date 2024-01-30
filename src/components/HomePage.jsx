import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import '../css/HomePage.css';
import PlanPutovanja from './PlanPutovanja';

function HomePage() {
  
  const [destination, setDestination] = useState('');
  const [selectedDestinationId, setSelectedDestinationId] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [destinationsOptions, setDestinationsOptions] = useState([]);
  const [sveDestinacije, setSveDestinacije] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);


  const handleDestinationChange = (e) => {
    const selectedDestination = sveDestinacije.data.find(option => option.name === e.target.value);
    setDestination(e.target.value);
    setSelectedDestinationId(selectedDestination ? selectedDestination.id : '');
  };
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

  useEffect(() => {
    const authToken = window.sessionStorage.getItem("auth_token");

    axios.get('http://127.0.0.1:8000/api/destinacija', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(response => {
        console.log(response.data);
        const allDestinations = response.data;

        // Postavlja opcije za destinacije
        setDestinationsOptions(allDestinations.data.map(option => option.name));
        setSveDestinacije(allDestinations);
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju destinacija:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (duration < 0 || budget < 0) {
      alert('Trajanje putovanja i budžet ne mogu biti manji od nule.');
      return;
    }

    const authToken = window.sessionStorage.getItem("auth_token");

    axios.get('http://127.0.0.1:8000/api/hotel', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(response => {
        console.log(response.data);
        const hotels = response.data.data;

        // Filtriramo hotele za izabranu destinaciju
        const selectedHotels = hotels.filter(hotel => hotel.destination_id === sveDestinacije.data.find(option => option.name === destination).id);

        // Pronalazimo hotele sa cenom noćenja u okviru budžeta
        const affordableHotels = selectedHotels.filter(hotel => {
          const totalCost = hotel.price * duration;
          return totalCost <= budget;
        });

        if (affordableHotels.length > 0) {
          const hotelNames = affordableHotels.map(hotel => hotel.name);
          alert(`Hoteli sa odgovarajućom cenom: ${hotelNames.join(', ')}`);
          setSelectedHotel(affordableHotels[0]);  // Odaberite prvi hotel (možete prilagoditi način odabira hotela)
          
        } else {
          alert('Nemate dovoljno veliki budžet za ovo putovanje.');
        }
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju hotela:', error);
      });
  };
   // Prikazivanje komponente PlanPutovanja ako je hotel odabran
   if (selectedHotel) {
    return (
      <PlanPutovanja

      destination_id={selectedDestinationId}
        destination={destination}
        budget={budget}
        startDate={startDate}
        duration={duration}
        hotel={selectedHotel}
      />
    );
  }
  return (
    <div className="home-page">
      <h2>Planiranje Putovanja</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Destinacija:</label>
          <select value={destination} onChange={handleDestinationChange} required>
           <option value="">Izaberite destinaciju...</option>
           {destinationsOptions.map((option, index) => ( 
             <option key={index} value={option}>{option}</option>
           ))}
          </select>
        </div>
        <div>
          <label>Budžet:</label>
          <input type="number" value={budget} onChange={handleBudgetChange} required />
        </div>
        <div>
          <label>Datum polaska:</label>
          <DatePicker selected={startDate} onChange={handleStartDateChange} minDate={new Date()} />
        </div>
        <div>
          <label>Trajanje putovanja (u danima):</label>
          <input type="number" value={duration} onChange={handleDurationChange}required />
        </div>
        <button type="submit">Planiraj Putovanje</button>
      </form>
    </div>
  );
}

export default HomePage;
