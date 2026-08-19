import React from "react";
import("./PageTitle.css");

export default function PageTitle({ icon, color1, color2, children }) {
  return (
    <div
      className="account-tab-title"
      style={{
        background: `linear-gradient(90deg, ${color1}, ${color2 || color1})`,
      }}
    >
      <div className="account-tab-title-icon">{icon}</div>
      {children}
    </div>
  );
}
