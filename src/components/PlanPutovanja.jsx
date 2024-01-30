import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/PlanPutovanja.css';

function PlanPutovanja({ destination_id, destination, budget, startDate, duration, hotel }) {
  const [attractions, setAttractions] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = window.sessionStorage.getItem('auth_token');

    axios.get(`http://127.0.0.1:8000/api/znamenitost/${destination_id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log(response.data);
        setAttractions(response.data.data);
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju atrakcija:', error);
      });
  }, [destination]);

  const generateDailySchedule = () => {
    const schedule = [];

    for (let day = 1; day <= duration; day++) {
      const dayAttractions = attractions.slice((day - 1) * 3, day * 3);

      const events = [
        { time: '7:00-10:00', activity: 'Doručak' },
        { time: '12:00-16:00', activity: 'Ručak' },
        { time: '19:00-22:00', activity: 'Večera' },
      ];

      if (day === 1) {
        events.unshift({ time: '12:00', activity: 'Prijava u hotel' });
      }

      if (day === duration) {
        events.push({ time: '14:00', activity: 'Odjava iz hotela' });
      }

      schedule.push({
        day: day,
        events: events,
        attractions: dayAttractions,
      });
    }

    return schedule;
  };

  const dailySchedule = generateDailySchedule();

  const handleCancel = () => {
    navigate.goBack();
    console.log('Poništi');
  };

  const handleSave = () => {
    const authToken = window.sessionStorage.getItem('auth_token');
  
    const planData = {
      destination_id: destination_id,
      duration: duration,
      budget: budget,
      date: startDate.toISOString().split('.')[0] + 'Z',
    };
  
    // Slanje podataka na server
    axios.post('http://127.0.0.1:8000/api/storePlanPutovanja', planData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log('Odgovor servera:', response.data);
        console.log('Plan putovanja je uspešno sačuvan.', response.data);
        setIsSaved(true); // Postavlja status sačuvanosti na true kada je plan putovanja sačuvan
       
      })
      .catch(error => {
        console.log('Greška pri čuvanju plana putovanja:', error); 
       
      });
  }
  const handlePrint = () => {
    console.log('Ištampaj');
  };

  return (
    <div className="plan-putovanja">
      <h2>Plan Putovanja</h2>
      <p>Hotel: {hotel.name}</p>
      <p>Destinacija: {destination}</p>
      <p>Budžet: {budget}</p>
      <p>Datum polaska: {startDate.toDateString()}</p>
      <p>Trajanje putovanja: {duration} dana</p>

      {dailySchedule.map((daySchedule, index) => (
        <div key={index}>
          <h3>{`Dan ${daySchedule.day}`}</h3>
          <ul>
            {daySchedule.events.map((event, eventIndex) => (
              <li key={eventIndex}>{`${event.time} - ${event.activity}`}</li>
            ))}
          </ul>

          <h4>Atrakcije između obroka:</h4>
          <ul>
            {daySchedule.attractions.map((attraction, attractionIndex) => (
              <li key={attractionIndex}>{attraction.name}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="buttons">
        <Link to="/homepage" className="button button-cancel" onClick={handleCancel}>
          Poništi
        </Link>
        <button onClick={handleSave} className="button button-save" disabled={isSaved}>
          {isSaved ? 'Sačuvano' : 'Sačuvaj'}
        </button>
        <button onClick={handlePrint} className="button button-print">
          Ištampaj
        </button>
      </div>
    </div>
  );
}

export default PlanPutovanja;
