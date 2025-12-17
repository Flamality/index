import React, { useContext, useEffect } from 'react';
import { Auth } from '../contexts/auth';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';

import './Auth.css';
import Signup from './Signup';

export default function AuthRoutes() {
  const { user, loading } = useContext(Auth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (loading) {
      return;
    } else {
      if (!user) {
      } else {
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect') || '/';
        navigate(redirect);
      }
    }
    document.title = "Login to a Flamality account"
  }, [user, loading]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </>
  );
}
