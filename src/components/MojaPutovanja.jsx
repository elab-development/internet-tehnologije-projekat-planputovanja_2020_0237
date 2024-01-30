import React, { useState, useEffect } from 'react';
import '../css/MojaPutovanja.css';
import axios from 'axios';

function MojaPutovanja() {
  const [planovi, setPlanovi] = useState([]);

  useEffect(() => {
    const authToken = window.sessionStorage.getItem('auth_token');

    axios.get('http://127.0.0.1:8000/api/planPutovanja', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log(response.data);

        // Provera da li odgovor sadrži niz planova putovanja
        if (Array.isArray(response.data.data)) {
          setPlanovi(response.data.data);  // Ažurirano ovde
        } else {
          console.error('Odgovor servera ne sadrži niz planova putovanja.');
        }
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju planova putovanja:', error);
      });
  }, []);

  return (
    <div>
      <h2>Moja putovanja</h2>
      {planovi.map(plan => (
        <div key={plan.id}>
          <p>Destinacija: {plan.destination}</p>
          <p>Datum polaska: {plan.date ? new Date(plan.date).toDateString() : 'N/A'}</p>
          <p>Trajanje putovanja: {plan.duration} dana</p>
          <p>Budžet: {plan.budget}</p>
          {/* Dodajte ostale informacije o putovanju koje želite prikazati */}
        </div>
      ))}
    </div>
  );
}

export default MojaPutovanja;
