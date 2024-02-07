import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const HotelCountVisualization = () => {
    const [data, setData] = useState([]);
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('auth_token');
        setAuthToken(token);
        fetchData(token); 
    }, []);

    const fetchData = async (token) => { 
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/hotel/count-by-destination', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            console.log(response.data); 
    
            // Extract data from the response
            const chartData = response.data.map(item => [item.destination, item.hotel_count]);
    
            // Insert column headers as the first row
            chartData.unshift(['Destination', 'Hotel Count']);
    
            // Set the data state
            setData(chartData);
        } catch (error) {
            console.error('Greška pri dohvaćanju podataka:', error);
        }
    };
    

    return (
        <div>
            <h2>Broj hotela po destinacijama</h2>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="BarChart"
                loader={<div>Učitavanje grafikona...</div>}
                data={data}
                options={{
                    title: 'Broj hotela po destinacijama',
                    chartArea: { width: '50%' },
                    hAxis: { title: 'Broj hotela' },
                    vAxis: { title: 'Destinacija' },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
};

export default HotelCountVisualization;
