import React from "react";
import "./TabCard.css";
import { Link } from "react-router-dom";
export default function TabCard({ link, text, desc, icon }) {
  return (
    <Link
      to={`/account/${link}`}
      className='account-tab-home-tabcard-container'
    >
      <div className='account-tab-home-tabcard'>
        <div className='account-tab-home-tabcard-info'>
          <p className='account-tab-home-tabcard-info-title'>{text}</p>
          <p className='account-tab-home-tabcard-info-desc'>{desc}</p>
        </div>
        {icon}
      </div>
    </Link>
  );
}
