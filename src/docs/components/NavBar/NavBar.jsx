import React from "react";

import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.branding}>
        <a href="/docs">Flamality Docs</a>
      </div>
    </div>
  );
}
