import { useState } from "react";
import styles from "./Candle.module.css";

export default function Candle() {
  const [blink, setBlink] = useState(false);
  const TIME2BLINK = 3000;

  setInterval(() => {
    setBlink(!blink);
  }, TIME2BLINK);

  return (
    <div className={styles.body}>
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={`${styles.red} ${styles.flame}`}></div>
          <div className={`${styles.orange} ${styles.flame}`}></div>
          <div className={`${styles.yellow} ${styles.flame}`}></div>
          <div className={`${styles.white} ${styles.flame}`}></div>
        </div>
      </div>
      <div className={styles.eyes}>
        <div className={`${styles.eye} ${styles.L}`}>
          <div
            className={styles.eyelid}
            style={{ height: blink ? "100%" : "0%" }}
          ></div>
          <div className={styles.pupil}></div>
        </div>
        <div className={`${styles.eye} ${styles.R}`}>
          <div
            className={styles.eyelid}
            style={{ height: blink ? "100%" : "0%" }}
          ></div>
          <div className={styles.pupil}></div>
        </div>
      </div>
    </div>
  );
}
