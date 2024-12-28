import { FC } from "react";
import styles from "./RatesAndConditions.module.css";
import { rates } from "@/constants/constants.tsx";

const RatesAndConditions: FC = () => {
  return (
    <div className={styles.rates__block}>
      {rates.map(({ name, description }, index) => (
        <div key={index} className={styles.rates__item}>
          <div className={styles.item__name}>{name}</div>
          <div className={styles.item__description}>{description}</div>
        </div>
      ))}
    </div>
  );
};

export default RatesAndConditions;
