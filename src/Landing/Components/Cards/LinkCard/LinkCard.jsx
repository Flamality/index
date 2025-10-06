import React from "react";
import "./LinkCard.css";

export default function LinkCard({ icon: Icon, link, text }) {
  return (
    <a
      className='link-card'
      href={`https://${link}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <p className='link-card-title'>{text}</p>
      <p className='link-card-url'>{link}</p>
      <Icon className='link-card-icon' />
    </a>
  );
}
