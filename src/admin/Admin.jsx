import React from 'react';

import styles from "./admin.module.css"
import { FaFlag, FaHouse } from 'react-icons/fa6';

function Admin() {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <FaHouse />
            <FaFlag />
        </div>
        <div className={styles.right}>
            <p>Logged in</p>
            <div className={styles.page_container}></div></div>
      
    </div>
  );
}

export default Admin;
