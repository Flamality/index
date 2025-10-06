import React from "react";

import "./SectionTitle.css";

export default function SectionTitle({ children }) {
  return (
    <div className='account-section-title'>
      <h2>{children}</h2>
      <div className='account-section-title-line'></div>
    </div>
  );
}
