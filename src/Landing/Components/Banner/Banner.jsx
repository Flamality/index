import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import { databases } from "../../../services/appwrite";
export default function Banner() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        databases.getDocument("main", "flags", "root_banner").then((res) => {
          setData(res);
        });
      } catch (error) {}
    };
    getData();
  }, []);

  if (!data || !data.active) return null;
  return (
    <div className={styles.banner}>
      <p className={styles.header}>{data?.title}</p>
      <p className={styles.content}>{data?.desc}</p>
    </div>
  );
}
