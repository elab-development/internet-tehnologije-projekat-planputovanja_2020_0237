// Register.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        // Ovde možete implementirati logiku za slanje podataka na backend
    };

    return (
        <div className="register-container">
            <h2>Registracija</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <label>Potvrdi password:</label>
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <button type="submit">Registruj se</button>
            </form>
        </div>
    );
}

export default Register;
