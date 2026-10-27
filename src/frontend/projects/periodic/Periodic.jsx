import React, { useEffect } from "react";

import styles from "./periodic.module.css";
import elementStyles from "./components/element/element.module.css";
import EData from "./data.json";
import Element from "./components/element/Element";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaCube,
  FaDroplet,
  FaExplosion,
  FaSteam,
  FaTemperatureArrowUp,
  FaXmark,
} from "react-icons/fa6";
import Context from "./components/context/Context";

export default function Periodic() {
  const { elem } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(null);
  useEffect(() => {
    if (elem) {
      const selectedElem = EData.elements.find(
        (e) => e.symbol === elem || e.number.toString() === elem,
      );
      setSelected(selectedElem);
    }
  }, [elem]);
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
      <div
        className={
          styles.tableContainer +
          " " +
          (selectedElem && elem ? styles.selected : "")
        }
      >
        <div className={styles.table}>
          <div className={styles.context}>
            <Context />
          </div>
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
      <div className={styles.info + " " + styles[String(!!elem)]}>
        {selected && (
          <div className={styles.infoContent}>
            <div className={styles.topInfo}>
              <Link to="/p/periodic" className={styles.closeLink}>
                <div className={styles.close}>
                  <FaXmark />
                </div>
              </Link>
              <p>{selected.name}</p>
            </div>
            <h2>
              <span
                className={
                  elementStyles[selected.category.replaceAll(" ", "_")]
                }
              >
                {selected.symbol}
              </span>{" "}
              {selected.name}
            </h2>
            <p className={styles.subtitle}>
              {selected.category.replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
            <p className={styles.summary}>{selected.summary}</p>
            <div className={styles.temp}>
              <FaExplosion />
              <p className={styles.tempNum}>
                {selected?.boil?.toLocaleString() || "Unknown"}
                {selected?.boil_unit} K
                <span className={styles.tempTip}>(Boiling Point)</span>
              </p>
              <FaDroplet />
              <p className={styles.tempNum}>
                {selected?.melt?.toLocaleString() || "Unknown"}
                {selected?.melt_unit} K
                <span className={styles.tempTip}>(Melting Point)</span>
              </p>
              <FaCube />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
