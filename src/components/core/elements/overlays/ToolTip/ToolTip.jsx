import React, { useState } from "react";
import styles from "./ToolTip.module.css";
export default function ToolTip({ position = "top", content = "", children }) {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => {
    if (content) setVisible(true);
  };
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && (
        <div className={styles.tooltip + " " + styles[position]}>{content}</div>
      )}
    </div>
  );
}
