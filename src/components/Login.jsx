import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Promenjena importacija
import '../css/Login.css';
import axios from "axios"

function Login({ addToken }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate(); // Promenjeno ime kuke

  function handleInput(e) {
    let newUserData=userData;
    newUserData[e.target.name]=e.target.value;
    setUserData(newUserData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/login", userData)
      .then((res) => {
        if (res.data.success === true && res.data.user) {
          window.sessionStorage.setItem("auth_token", res.data.access_token);
          console.log("Token:", res.data.access_token); // Dodajemo console.log za proveru tokena
          addToken(res.data.access_token, res.data.user.role_id);
          setIsLoggedIn(true);
  
          if (res.data.user.role_id === 1) {
            navigate("/admin");
          } else if (res.data.user.role_id === 2) {
            navigate("/homepage");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onInput={handleInput} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onInput={handleInput} />
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
