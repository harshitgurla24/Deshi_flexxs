import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../utils/api';
import { setCredentials } from '../features/authSlice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/signin', { email, password });
      const { token, user } = res.data;
      if (token) {
        dispatch(setCredentials({ user, token }));
      }
      alert('Sign in successful!');
      setEmail('');
      setPassword('');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.error || 'Sign in failed');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
