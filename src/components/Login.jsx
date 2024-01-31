import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import axios from "axios"


function Login({addToken}) { 
  const[userData,setUserData]=useState({
    email:"",
    password:"",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Dodajemo korisničku kuku
  let navigate=useNavigate();

  function handleInput(e) {
    let newUserData=userData;
    newUserData[e.target.name]=e.target.value;
    setUserData(newUserData);
  }

  function handleSubmit(e){
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/login",userData).then((res)=>{
      console.log(res.data);
      if(res.data.success===true){
        window.sessionStorage.setItem("auth_token",res.data.access_token);
        addToken(res.data.access_token);
        setIsLoggedIn(true); // Postavljamo isLoggedIn na true kada se korisnik uspešno prijavi
        navigate("/homepage");
      }
    }).catch((e)=>{
      console.log(e);
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
