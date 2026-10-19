import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Element.module.css";

export default function Element({ e, section }) {
  const navigate = useNavigate();
  const { elem } = useParams();
  const [selected, setSelected] = React.useState(false);
  let posY = e.ypos;
  let posX = e.xpos;
  if (section === "bottom") {
    posY -= 8;
    posX -= 3;
  }
  if (section === "right") {
    posX -= 3;
  }
  if (e.number === 57 || e.number === 89) {
    posY -= 3;
  }

  useEffect(() => {
    if (elem === e.symbol || elem === e.number.toString()) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [elem, e.symbol, e.number]);
  return (
    <div
      className={
        styles.wrapper +
        " " +
        styles[e.category.replaceAll(" ", "_")] +
        " " +
        (selected ? styles.selected : "")
      }
      style={{ gridColumn: posX, gridRow: posY }}
    >
      <div
        className={styles.container}
        onClick={() => {
          navigate(`/p/periodic/${e.symbol}`);
        }}
      >
        <p className={styles.number}>{e.number}</p>
        <p className={styles.symbol}>{e.symbol}</p>
        <p className={styles.name}>{e.name}</p>
      </div>
    </div>
  );
}
