import React from "react";

import styles from "../Auth.module.css";

export default function AuthContainer({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
