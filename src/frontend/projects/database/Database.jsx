import React from "react";
import { db, dbReady } from "./service_pglite";

import styles from "./database.module.css";
import Button from "../../../components/core/elements/inputs/buttons/Button/Button";

export default function Database() {
  const [ready, setReady] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [value, setValue] = React.useState("SELECT version();");
  const [error, setError] = React.useState("");
  const [running, setRunning] = React.useState(false);
  const boxRef = React.useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const el = boxRef.current;
    if (!el) return;
    const startY = e.clientY;
    const startHeight = el.getBoundingClientRect().height;
    const handleMouseMove = (event) => {
      const delta = startY - event.clientY;
      el.style.flexBasis = `${Math.max(
        50,
        startHeight + startY - event.clientY,
      )}px`;
    };
    const handleMouseUp = () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", handleMouseUp);
  };

  React.useEffect(() => {
    dbReady
      .then(() => setReady(true))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  async function runQuery() {
    setRunning(true);
    setError("");

    try {
      const res = await db.query(value);
      setResult(res);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p>
          Status{" "}
          <span
            className={
              styles.status + " " + (ready ? styles.ready : styles.loading)
            }
          >
            {ready ? "Ready" : "Loading..."}
          </span>
        </p>
        <Button
          onClick={runQuery}
          disabled={!ready || running || !value.trim()}
        >
          {running ? "Running..." : "Run"}
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.result} ref={boxRef}>
        <div className={styles.resizer} onMouseDown={handleMouseDown} />
        {error && <pre className={styles.error}>{error}</pre>}

        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </div>
  );
}
