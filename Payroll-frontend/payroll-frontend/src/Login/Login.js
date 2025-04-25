
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './login.css';

const apiUrl = process.env.REACT_APP_API_URL;
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, credentials);
      console.log("Response data:", res.data);
      alert('OTP sent to your email');
      setEmail(res.data.email);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/verifyOTP`, {
        email: email,
        otp: otp,
      });
      console.log("Response data:", res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('OTP verification failed');
    }
  };

  return (
    <div className="login-container">
    <div className="login-form-container">
      <h2>Login</h2>
      {step === 1 && (
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          <button className="login-button" type="submit">Login</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <p>Your OTP was sent to: <strong>{email}</strong></p>
          <input
            className="login-input"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button className="login-button" type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  </div>
  );
};

export default Login;
