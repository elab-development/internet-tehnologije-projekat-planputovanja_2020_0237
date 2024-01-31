import React, { useState, useEffect } from 'react';
import '../css/MojaPutovanja.css';
import axios from 'axios';

function MojaPutovanja() {
  const [planovi, setPlanovi] = useState([]);
  const [page, setPage] = useState(1);
  const [destinationFilter, setDestinationFilter] = useState('');
  const [sveDestinacije, setSveDestinacije] = useState(null);
  const [sviIDs, setDestinationsIDs] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page, destinationFilter, sveDestinacije, sviIDs]);

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
        setDestinationsIDs(allDestinations.data.map(option => option.destination_id));
        setSveDestinacije(allDestinations);
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju destinacija:', error);
      });
  }, []);

  const fetchData = () => {
    const authToken = window.sessionStorage.getItem('auth_token');
  
    axios.get(`http://127.0.0.1:8000/api/planPutovanja?page=${page}&destination=${destinationFilter}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log(response.data);
  
        if (Array.isArray(response.data.data)) {
          const updatedPlanovi = response.data.data.map(plan => {
            const destinationDetails = sveDestinacije?.data?.find(dest => dest.id === plan.destination_id);
            return {
              ...plan,
              destination: destinationDetails ? destinationDetails.name : 'N/A',
            };
          });
          setPlanovi(updatedPlanovi);
        } else {
          console.error('Odgovor servera ne sadrži niz planova putovanja ili data nije definisan.');
        }
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju planova putovanja:', error);
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (e) => {
    setDestinationFilter(e.target.value);
  };

  return (
    <div>
      <h2>Moja putovanja</h2>

      {/* Filter input */}
      <input type="text" placeholder="Filter by destination" value={destinationFilter} onChange={handleFilterChange} />

      {planovi.map(plan => (
        <div key={plan.id}>
          <p>Destinacija: {plan.destination}</p>
          <p>Datum polaska: {plan.date ? new Date(plan.date).toDateString() : 'N/A'}</p>
          <p>Trajanje putovanja: {plan.duration} dana</p>
          <p>Budžet: {plan.budget}</p>
        </div>
      ))}

      {/* Pagination */}
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous Page</button>
        <span> Page {page} </span>
        <button onClick={() => handlePageChange(page + 1)}>Next Page</button>
      </div>
    </div>
  );
}

export default MojaPutovanja;
