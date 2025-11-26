import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../utils/api';
import { setCredentials } from '../features/authSlice';
import '../styles/Auth.css';

const SignUp = () => {
  const [step, setStep] = useState(1); // 1 = form, 2 = OTP verification
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [maskedPhone, setMaskedPhone] = useState('');
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle sending OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (phone.length < 10) {
      setError('Phone number must be at least 10 digits');
      setLoading(false);
      return;
    }

    try {
      const res = await API.post('/api/send-otp', {
        name,
        email,
        phone,
        password,
      });

      setUserId(res.data.userId);
      setMaskedPhone(res.data.phone);
      setStep(2);
      setTimer(600); // 10 minutes
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otp) {
      setError('Please enter OTP');
      setLoading(false);
      return;
    }

    try {
      const res = await API.post('/api/verify-otp', {
        email,
        otp,
      });

      const { token, user } = res.data;
      if (token) {
        dispatch(setCredentials({ user, token }));
      }
      alert('Sign up successful!');
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown effect
  React.useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>

        {step === 1 ? (
          // Step 1: User Details Form
          <form onSubmit={handleSendOTP} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
                maxLength="15"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <p className="auth-link">
              Already have an account? <a href="/signin">Sign In</a>
            </p>
          </form>
        ) : (
          // Step 2: OTP Verification
          <form onSubmit={handleVerifyOTP} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="otp-info">
              <p>Enter the 6-digit OTP sent to</p>
              <p className="phone-number">+91 ****{maskedPhone}</p>
            </div>

            <div className="form-group">
              <label>One Time Password (OTP)</label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={loading}
                maxLength="6"
                className="otp-input"
              />
            </div>

            <div className="otp-timer">
              {timer > 0 ? (
                <p>Expires in: <strong>{formatTime(timer)}</strong></p>
              ) : (
                <p className="expired">OTP expired. Please start over.</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading || timer <= 0} 
              className="btn-primary"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button 
              type="button" 
              onClick={() => {
                setStep(1);
                setOtp('');
                setError('');
              }} 
              className="btn-secondary"
            >
              Back to Edit Details
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
