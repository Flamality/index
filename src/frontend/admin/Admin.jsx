import React, { useContext, useEffect } from "react";

import styles from "./admin.module.css";
import { FaFlag, FaHouse, FaPaintbrush, FaPeopleGroup } from "react-icons/fa6";
import { Link, Route, Routes } from "react-router-dom";
import Flags from "./pages/Flags/Flags";
import Users from "./pages/Users/Users";
import { Auth } from "../contexts/auth";
import Loading from "../components/core/screens/Loading";
import { FaExclamationCircle } from "react-icons/fa";
import Design from "./pages/Design/Design";
import { presences } from "../services/appwrite";

function Admin() {
  const { user, loading } = useContext(Auth);

  const [presence, setPresence] = React.useState(null);

  useEffect(() => {
    document.title = "Admin Panel";
  }, []);

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const res = await presences.list();
        setPresence(res);
      } catch (error) {}
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user || !user.$id) {
      window.location.href = "/auth/login";
    }
    if (user.labels.indexOf("admin") === -1) {
      window.location.href = "/";
    }
  }, [user]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link to="/admin">
          <FaHouse className={styles.icon} />
        </Link>
        <Link to="/admin/flags">
          <FaFlag className={styles.icon} />
        </Link>
        <Link to="/admin/users">
          <FaPeopleGroup className={styles.icon} />
        </Link>
        <Link to="/admin/design">
          <FaPaintbrush className={styles.icon} />
        </Link>
        {/* <Link to='/admin/reports'>
          <FaTriangleExclamation className={styles.icon} />
        </Link>
        <Link to='/admin/tickets'>
          <FaTicket className={styles.icon} />
        </Link>
        <Link to='/admin/moderation'>
          <FaGavel className={styles.icon} />
        </Link> */}
      </div>
      <div className={styles.right}>
        <p>Logged in</p>
        <div className={styles.page_container}>
          <Routes>
            <Route path="flags" element={<Flags />} />
            <Route path="users" element={<Users />} />
            <Route path="design" element={<Design />} />
            <Route
              path="*"
              element={
                <FaExclamationCircle className={styles.not_found_icon} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
