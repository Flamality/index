import React from "react";

import "./Tab.css";

export default function Tab({ index, active, onClick, label, children }) {
  return (
    <div
      className={`core-element-tab ${active ? "active" : ""}`}
      onClick={() => onClick?.(index)}
    >
      {label && <div className="core-element-tab-label">{label}</div>}

      <div className="core-element-tab-content">{children}</div>
    </div>
  );
}
