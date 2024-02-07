import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/AdminHotel.css"

const AdminHotel = () => {
    const [hotels, setHotels] = useState([]);
    const [newHotelName, setNewHotelName] = useState('');
    const [newHotelLocation, setNewHotelLocation] = useState('');
    const [newHotelPrice, setNewHotelPrice] = useState('');
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('auth_token');
        setAuthToken(token); // Dobijanje tokena iz sessionStorage-a
        fetchHotels();
    }, []);

    const fetchHotels = () => {
        axios.get('http://127.0.0.1:8000/api/hotel', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then(response => {
            console.log(response.data);
            setHotels(response.data.data);
        })
        .catch(error => {
            console.error('Greška pri dohvaćanju hotela:', error);
        });
    };

    const addHotel = () => {
        axios.post('http://127.0.0.1:8000/api/hotel', {
            name: newHotelName,
            location: newHotelLocation,
            price: newHotelPrice
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then(response => {
            console.log('Hotel uspešno dodat:', response.data);
            fetchHotels();
            setNewHotelName('');
            setNewHotelLocation('');
            setNewHotelPrice('');
        })
        .catch(error => {
            console.error('Greška pri dodavanju hotela:', error);
        });
    };

    const deleteHotel = (hotelId) => {
        axios.delete(`http://127.0.0.1:8000/api/hotel/${hotelId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then(response => {
            console.log('Hotel uspešno obrisan:', response.data);
            fetchHotels();
        })
        .catch(error => {
            console.error('Greška pri brisanju hotela:', error);
        });
    };

    return (
        <div className="admin-hotel-container">
            <div className="admin-hotel-content">
            <h2>Hoteli</h2>
            <ul>
                {hotels.map(hotel => (
                    <li key={hotel.id}>
                        {hotel.name} - {hotel.location} - {hotel.price}
                        <button onClick={() => deleteHotel(hotel.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            </div>
            
        </div>
    );
};

export default AdminHotel;
