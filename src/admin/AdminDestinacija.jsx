import React, { useState } from 'react';
import axios from 'axios';
import '../css/AdminDestinacija.css';

function AdminDestinacija() {
  const [destinacija, setDestinacija] = useState({
    name: '',
    country: ''
  });
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestinacija({ ...destinacija, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = window.sessionStorage.getItem('auth_token');
      const formData = new FormData();
      formData.append('name', destinacija.name);
      formData.append('country', destinacija.country);

      await axios.post('http://127.0.0.1:8000/api/destinacija', formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setDestinacija({ name: '', country: '' });
      setIsSaved(true);
      console.log('Destinacija je uspešno sačuvana.');
    } catch (error) {
        console.log('Greška pri čuvanju destinacije', error); 
    }
  };

  return (
    <div className="admin-destinacija-container">
      <div className="admin-destinacija-content">
        <h2>Dodaj destinaciju</h2>
        <form className="admin-destinacija-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={destinacija.name}
            onChange={handleChange}
            placeholder="Naziv destinacije"
            required
          />
          <input
            type="text"
            name="country"
            value={destinacija.country}
            onChange={handleChange}
            placeholder="Država"
            required
          />
           <button type="submit">Dodaj</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default AdminDestinacija;
