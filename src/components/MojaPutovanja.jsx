import React, { useState, useEffect } from 'react';
import '../css/MojaPutovanja.css';
import axios from 'axios';

function MojaPutovanja() {
  const [planovi, setPlanovi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [destinationFilter, setDestinationFilter] = useState('');
  const [sveDestinacije, setSveDestinacije] = useState(null);
  const plansPerPage = 3; // Broj planova po strani

  useEffect(() => {
    fetchData();
  }, [currentPage, destinationFilter, sveDestinacije]);

  const fetchData = () => {
    const authToken = window.sessionStorage.getItem('auth_token');
  
    axios.get('http://127.0.0.1:8000/api/planPutovanja', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log(response.data);
        setPlanovi(response.data.data);
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju planova putovanja:', error);
      });
  };

  const filteredPlans = planovi.filter(plan => {
    return plan.destination_name.toLowerCase().includes(destinationFilter.toLowerCase());
  });

  // Izračunajte ukupan broj strana
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);

  // Izračunajte koji planovi treba da budu prikazani na trenutnoj stranici
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (e) => {
    setDestinationFilter(e.target.value);
  };

  return (
    <div className="moja-putovanja-container">
      <h2>Moja putovanja</h2>

      {/* Filter input */}
      <input type="text" placeholder="Filter by destination" value={destinationFilter} onChange={handleFilterChange} />

      {currentPlans.map(plan => (
        <div key={plan.id}>
          <p>Destinacija: {plan.destination_name}</p>
          <p>Datum polaska: {plan.date ? new Date(plan.date).toDateString() : 'N/A'}</p>
          <p>Trajanje putovanja: {plan.duration} dana</p>
          <p>Budžet: {plan.budget}</p>
        </div>
      ))}

      {/* Pagination */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-button" >Previous Page</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-button" >Next Page</button>
      </div>
    </div>
  );
}

export default MojaPutovanja;
