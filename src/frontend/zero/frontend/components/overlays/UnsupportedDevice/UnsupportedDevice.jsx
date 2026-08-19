import React from 'react';

import "./UnsupportedDevice.css"

export default function UnsupportedDevice() {
  return (
    <div className='popup-device-too-small'>
      <h2>Unsupported Device</h2>
      <p>We apologize for the inconvenience, but Zone Zero is currently optimized for larger displays. Support for smaller devices is planned and will be available in a future update.</p>
    </div>
  );
}
