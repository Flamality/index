import React from "react";
import { AiOutlineDiscord } from "react-icons/ai";
import "./DiscordCard.css";
export default function DiscordCard() {
  return (
    <div className='landing-discord-card'>
      <div>
        <img src='https://flamality.com/images/Mizu1.jpg' />
        <div className='landing-discord-card-status' />
        <div className='landing-discord-card-info'>
          <h2>Remi</h2>
          <h3>flamality</h3>
        </div>
        <a
          href={"https://discord.com/users/995390725388771438"}
          target='_blank'
          rel='noopener noreferrer'
        >
          View on Discord
        </a>
      </div>
    </div>
  );
}
