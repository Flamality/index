import React, { useContext } from 'react';
import './TabButton.css';
import { Link, useParams } from 'react-router-dom';
import { Auth } from '../../../../contexts/auth';

export default function TabButtonLogout({ icon }) {
  const { logout } = useContext(Auth);
  return (
    <div
      className={
        'account-navigation-tabbutton account-navigation-tabbutton-logout'
      }
      onClick={logout}
    >
      {icon}
      <p>Logout</p>
    </div>
  );
}
