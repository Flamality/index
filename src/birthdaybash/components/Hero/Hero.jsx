import React from 'react';
import './Hero.css';
import Confetti from '../Confetti/Confetti';
export default function Hero() {
  return (
    <div className="birthdaybash-hero">
      <div className="birthdaybash-hero-title">
        <h2>Flamality's</h2>
        <h1>Birthday Bash</h1>
      </div>
      <div className="birthdaybash-hero-navigation">
        <button>Add my birthday</button>
        <button>View today's birthdays</button>
        <Confetti />
      </div>
    </div>
  );
}
