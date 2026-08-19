import React, { useEffect, useState } from "react";

import styles from "./Hero.module.css";

export default function Hero() {
  const [season, setSeason] = useState("summer");

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) {
      setSeason("spring");
    }
    if (month >= 5 && month <= 7) {
      setSeason("summer");
    }
    if (month >= 8 && month <= 10) {
      setSeason("autumn");
    }
    if (month === 11 || month <= 1) {
      setSeason("winter");
    }

    // TESTING
    // setSeason("autumn");
  }, []);

  return (
    <div className={styles.hero + " " + styles[season]}>
      <div className={styles.hero_background}>
        {season === "winter" && <div className={styles["more-snow"]}></div>}
        {Array.from({ length: 6 }, (_, i) => (
          <img
            key={i}
            src={`images/Mountain/MountainLayer${i + 1}.png`}
            className={
              styles.hero_background_layer + " " + styles[`layer${i + 1}`]
            }
            style={{ zIndex: i + 1, animationDelay: `${i * 2}s` }}
          />
        ))}
      </div>
      <h1>Flamality</h1>
      <h2>Web Developer</h2>
    </div>
  );
}
