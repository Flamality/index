import React, { useContext } from "react";

import { Link } from "react-router-dom";

import styles from "./TopLevelNav.module.css";
import { FaArrowRightToBracket, FaHouse } from "react-icons/fa6";
import { Auth } from "../../../contexts/auth";

export default function TopLevelNav() {
  const { logout } = useContext(Auth);
  return (
    <div className={styles.container}>
      <Link to='/'>
        <div className={styles.hover}>
          <FaHouse />
        </div>
      </Link>
      <div className={styles.drawer_container}>
        <div className={styles.drawer}>
          <div onClick={logout}>
            <FaArrowRightToBracket />
          </div>
        </div>
      </div>
    </div>
  );
}
