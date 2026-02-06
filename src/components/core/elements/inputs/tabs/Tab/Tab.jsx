import React from "react";

import "./Tab.css";

export default function Tab({ index, active, onClick, children }) {
  return (
    <div
      className={`core-element-tab ${active ? "active" : ""}`}
      onClick={() => onClick?.(index)}
    >
      {children}
    </div>
  );
}
