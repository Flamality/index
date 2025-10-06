import React, { useContext } from 'react';
import './TopBanner.css';
import { Auth } from '../../../../../contexts/auth';
export default function TopBanner() {
  const { userData } = useContext(Auth);
  return (
    <div className="account-tab-home-topbanner">
      <div className="account-tab-home-topbanner-displaycircle" />
      <img src={userData?.avatar} />
      <p>Hello, {userData?.display || userData?.username || 'User'}</p>
    </div>
  );
}
