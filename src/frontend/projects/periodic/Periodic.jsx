import React from "react";

import styles from "./periodic.module.css";

import EData from "./data.json";
import Element from "./components/element/Element";
import { useParams } from "react-router-dom";

export default function Periodic() {
  const { elem } = useParams();
  const selectedElem = EData.elements.find(
    (e) => e.symbol === elem || e.number.toString() === elem,
  );
  const elements = EData.elements;
  const leftElements = elements.filter(
    (element) =>
      (element.xpos <= 3 && element.ypos <= 7) ||
      element.number === 57 ||
      element.number === 89,
  );
  const rightElements = elements.filter(
    (element) => element.xpos > 3 && element.ypos <= 7,
  );
  const bottomElements = elements.filter(
    (element) =>
      ((element.group === 3 && element.period === 6) ||
        (element.group === 3 && element.period === 7)) &&
      element.number !== 57 &&
      element.number !== 89,
  );
  return (
    <div className={styles.container}>
      <h1>Periodic Table</h1>
      <div
        className={
          styles.tableContainer +
          " " +
          (selectedElem && elem ? styles.selected : "")
        }
      >
        <div className={styles.table}>
          <div className={styles.left}>
            {leftElements.map((e) => (
              <Element key={e.number} e={e} section="left" />
            ))}
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              {rightElements.map((e) => (
                <Element key={e.number} e={e} section="right" />
              ))}
            </div>
            <div className={styles.bottom}>
              {bottomElements.map((e) => (
                <Element key={e.number} e={e} section="bottom" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
