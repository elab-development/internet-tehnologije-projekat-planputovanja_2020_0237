import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const users = [
  { id: 1, email: 'dusan@gmail.com', password: 'dusan_123' },
  { id: 2, email: 'kristina@gmail.com', password: 'kristina_123' },
  { id: 3, email: 'user3@example.com', password: 'password3' },
];

function loginUser(email, password) {
  const user = users.find(user => user.email === email);
  if (user && user.password === password) {
    return user;
  } else {
    return null;
  }
}

function Login({ onLogin }) { // Dodajte onLogin prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = loginUser(email, password);
    if (user) {
      console.log('Uspješna prijava:', user.email);
      onLogin(user.email); // Pozovite onLogin callback sa emailom korisnika
    } else {
      console.log('Neuspješna prijava. Provjerite e-mail i lozinku.');
      return; // Zaustavi dalje izvršavanje ako prijava nije uspela
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>Nemate nalog? <Link to="/register">Registracija</Link></p>
      </div>
    </div>
  );
}

export default Login;
