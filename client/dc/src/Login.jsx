import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (name && password) {
      try {
        const response = await fetch('http://localhost:4000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); 
          navigate('/dashboard');
        } else {
          alert('Invalid username or password');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <img
          src="https://media.istockphoto.com/id/1447358767/photo/help-healthcare-or-doctor-holding-hands-with-patient-zoom-for-support-trust-or-communication.jpg?s=1024x1024&w=is&k=20&c=9jajg3uzrmZ24XDVNR-J_m7ucANdiXKWqwD9ZE50TOQ="
          alt="Help"
        />
      </div>
      <div className="border-line"></div>
      <div className="login-container">
        <div className="login">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder='Username'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="log" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
