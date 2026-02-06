import React, { useState } from "react";

import styles from "./Footer.module.css";
import { FaChevronDown } from "react-icons/fa6";

export default function Footer() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.name}>{/* <p>Flamality</p> */}</div>
          <div className={styles.left_container}>
            <div className={styles.left_language}></div>
          </div>
          <img src="https://flamality.com/images/Mizu3.png" />
        </div>
        <div className={styles.right}>
          <div className={`${styles.cat} ${open1 && styles.open}`}>
            <div
              className={styles.cat_title}
              onClick={() => {
                setOpen1(!open1);
              }}
            >
              <p>Me</p>
              <FaChevronDown className={styles.cleft} />
              <FaChevronDown className={styles.cright} />
            </div>
            <div>
              <a href="https://discord.com/users/995390725388771438">Discord</a>
            </div>
          </div>
          <div className={`${styles.cat} ${open2 && styles.open}`}>
            <div
              className={styles.cat_title}
              onClick={() => {
                setOpen2(!open2);
              }}
            >
              <p>Projects</p>
              <FaChevronDown className={styles.cleft} />
              <FaChevronDown className={styles.cright} />
            </div>
            <div>
              <a href="https://flamality.com">Flamality</a>
              <a href="https://portfolio.flamality.com">Portfolio</a>
              <a href="https://mhspride.club">MHS Pride Club</a>
            </div>
          </div>
          <div className={`${styles.cat} ${open3 && styles.open}`}>
            <div
              className={styles.cat_title}
              onClick={() => {
                setOpen3(!open3);
              }}
            >
              <p>Resources</p>
              <FaChevronDown className={styles.cleft} />
              <FaChevronDown className={styles.cright} />
            </div>
            <div>
              <a href="mailto:remi@flamality.com">Email</a>
            </div>
          </div>

          <div className={`${styles.cat} ${open4 && styles.open}`}>
            <div
              className={styles.cat_title}
              onClick={() => {
                setOpen4(!open4);
              }}
            >
              <p>Policies</p>
              <FaChevronDown className={styles.cleft} />
              <FaChevronDown className={styles.cright} />
            </div>
            <div>
              <a href="/terms">Terms</a>
              <a href="/privacy">Privacy</a>
              <a href="/cookies">Cookies</a>
              <a href="/guidelines">Guidelines</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>F1AMAL1TY</p>
      </div>
      {/* {import.meta.env.APPWRITE_SITE_DEPLOYMENT} -{" "}
      {import.meta.env.APPWRITE_SITE_RUNTIME_VERSION} | [
      {import.meta.env.APPWRITE_SITE_CPUS}:
      {import.meta.env.APPWRITE_SITE_MEMORY}] */}
    </div>
  );
}
