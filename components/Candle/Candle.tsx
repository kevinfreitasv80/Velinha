import { useEffect, useState } from "react";
import styles from "./Candle.module.css";

type CandleProps = {
  size: number;
};

export default function Candle(props: CandleProps) {
  const [blink, setBlink] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const TIME2BLINK = 250;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink(true);
      setIsOpen(!isOpen);

      setTimeout(() => {
        setBlink(false);
      }, TIME2BLINK);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <div className={styles.body} style={{ height: `${props.size * 6}em` }}>
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
