import React, { useEffect } from "react";

import styles from "./Checkbox.module.css";

export default function Checkbox({ value, onChange, label }) {
  return (
    <div className={styles.checkboxContainer}>
      {label && <label className={styles.checkboxLabel}>{label}</label>}
      <div
        className={styles.checkboxWrapper}
        onClick={() => {
          onChange(!value);
        }}
      >
        <div
          className={`${styles.checkbox} ${!!value ? styles.checked : ""}`}
        ></div>
      </div>
    </div>
  );
}
