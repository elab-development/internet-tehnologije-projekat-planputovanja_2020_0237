import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../css/Register.css';
import axios from "axios"

function Register() { 
    const[userData,setUserData]=useState({
        name:"",
        email:"",
        password:"",
      });
      let navigate=useNavigate();

      function handleInput(e) {
        let newUserData=userData;
        newUserData[e.target.name]=e.target.value;
        setUserData(newUserData);
      }
    
      function handleSubmit(e){
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/register",userData).then((res)=>{
          console.log(res.data);
          navigate("/login");
        }).catch((e)=>{
          console.log(e);
        });
      }

    return (
        <div className="register-container">
            <h2>Registracija</h2>
            <form className="register-form" onSubmit={handleSubmit}>
            <div>
                    <label>Ime:</label>
                    <input type="name" name="name" onInput={handleInput} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onInput={handleInput} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onInput={handleInput} />
                </div>
               
                <button type="submit">Registruj se</button>
            </form>
        </div>
    );
}

export default Register;
