import React from 'react';

import "./DMButton.css"
import { useNavigate } from 'react-router-dom';

export default function DMButton({key, dm}) {
  const navigate = useNavigate()
  const nav = () => {
    navigate(`/app/${dm?.$id}`)
  }
  return (
    <div className='app-bar-dms-button' onClick={nav}>
      <div className='app-bar-dms-button-avatar'>
        <img src='https://flamality.com/images/Mizu1.jpg' />
      </div>
      <div className='app-bar-dms-button-text'>
        <p className='app-bar-dms-button-text-name'>{dm?.name}</p>
        <p className='app-bar-dms-button-text-content'>Say hi!</p>
      </div>
    </div>
  );
}
