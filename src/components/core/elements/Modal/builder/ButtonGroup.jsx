import React from "react";

export default function ButtonGroup({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
      }}
    >
      {children}
    </div>
  );
}
