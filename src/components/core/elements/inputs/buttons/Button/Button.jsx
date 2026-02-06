import React from "react";

import styles from "./Button.module.css";

export default function Button({
  leading,
  trailing,
  onClick,
  disabled = false,
  style = "grayscale",
  children,
}) {
  return (
    <div
      className={styles.button + " " + styles[style]}
      onClick={onClick}
      disabled={disabled}
    >
      {leading && { leading }}
      <p>{children}</p>
      {trailing && { trailing }}
    </div>
  );
}
