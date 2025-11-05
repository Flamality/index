import React, { useState } from 'react'

import "./Footer.css"

export default function Footer() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
  return (
    <div className='landing-footer'>
        <div className='landing-footer-top'>
          <div className='landing-footer-left'>
            <div className='landing-footer-name'>
              <p>Flamality</p>
            </div>
            <img src='https://flamality.com/images/Mizu3.png' />
          </div>
          <div className='landing-footer-right'>
            <div className={`landing-footer-link-cat ${open1}`}>
              <p className='landing-footer-link-cat-title' onClick={()=>{setOpen1(!open1)}}>Me</p>
              <div>
                <a>Idk man</a>
              </div>
            </div>
          <div className={`landing-footer-link-cat ${open2}`} >
              <p className='landing-footer-link-cat-title' onClick={()=>{setOpen2(!open2)}}>Projects</p>
              <div>
                <a href='https://flamality.com'>Flamality</a>
                <a href='https://colors.flamality.com'>Color Picker</a>
                <a href='https://portfolio.flamality.com'>Portfolio</a>
                <a href='https://flamality.com'>Zone Zero</a>
                <a href='https://mhspride.club'>MHS Pride Club</a>
              </div>
              
            </div>
            <div className={`landing-footer-link-cat ${open3}`}>
              <p className='landing-footer-link-cat-title' onClick={()=>{setOpen3(!open3)}}>Resources</p>
              <div>
                <a href='mailto:remi@flamality.com'>Email</a>
              </div>
            </div>
            
            <div className={`landing-footer-link-cat ${open4}`}>
              <p className='landing-footer-link-cat-title' onClick={()=>{setOpen4(!open4)}}>Policies</p>
              <div>
                <a href='/terms'>Terms</a>
                <a href='/privacy'>Privacy</a>
                <a href='/cookies'>Cookies</a>
                <a href='/guidelines'>Guidelines</a>
              </div>
            </div> 
          </div>
        </div> 
        <div className='landing-footer-bottom'><p>F1AMAL1TY</p></div>
      </div>
  )
}
