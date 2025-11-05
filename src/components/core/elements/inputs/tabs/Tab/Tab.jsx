import React from 'react';

export default function Tab({ index, active, onClick, children }) {
  return (
    <div
      className={`core-element-tab ${active ? 'active' : ''}`}
      onClick={() => onClick?.(index)}
    >
      {children}
    </div>
  );
}
