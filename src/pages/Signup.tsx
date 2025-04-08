// Signup.tsx

import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { fullname, email, password });
      alert(response.data);
      setIsOtpSent(true);
    } catch (error) {
      alert('Error during registration');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/verify-otp', { email, otp });
      alert(response.data);
    } catch (error) {
      alert('Error during OTP verification');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {!isOtpSent ? (
        <form onSubmit={handleSignup}>
          <div>
            <label>Fullname:</label>
            <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div>
            <label>OTP:</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default Signup;