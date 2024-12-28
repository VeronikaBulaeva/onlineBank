import { FC } from "react";
import styles from "./Cashback.module.css";
import { cashback } from "@/constants/constants.tsx";

const Cashback: FC = () => {
  return (
    <div className={styles.cashback}>
      {cashback.map(({ title, description }, index) => (
        <div className={styles.cashback__item} key={index}>
          <p className={styles.item__title}>{title}</p>
          <p className={styles.item__description}>{description}</p>
        </div>
      ))}
    </div>
  );
};

export default Cashback;
