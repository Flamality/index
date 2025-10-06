import React, { useContext, useState } from 'react';
import { Auth } from '../contexts/auth';
import { Link, useLocation } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(Auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    } else if (password.length > 128) {
      setPasswordError('Password must be less than 128 characters.');
      return;
    }
    try {
      const res = await login(email, password);
    } catch (error) {
      setPasswordError('Invalid email or password.');
    }
  };

  return (
    <div className="auth-screen">
      <Link to="/" className="auth-screen-title">
        Flamality
      </Link>
      <div className="auth-screen-decor" />
      <div className="auth-screen-form">
        <h1>Login</h1>
        <p>Please log in to continue.</p>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p
            className={`auth-screen-form-error ${
              emailError ? '' : 'auth-screen-form-error-hidden'
            }`}
          >
            {emailError || ':D'}
          </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p
            className={`auth-screen-form-error ${
              passwordError ? '' : 'auth-screen-form-error-hidden'
            }`}
          >
            {passwordError || ':D'}
          </p>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p className="auth-screen-form-footer">
          Don't have an account?{' '}
          <a href={`/auth/register${location.search}`}>Register here</a>.
        </p>
      </div>
    </div>
  );
}
