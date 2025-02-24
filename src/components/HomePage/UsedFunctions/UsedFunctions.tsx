import { FC } from "react";
import styles from "./UsedFunctions.module.css";
import Man from "@/assets/homePageMan.png";
import { features } from "@/constants/constants.tsx";
import Check from "@/assets/checkCircle.svg";

const UsedFunctions: FC = () => {
  return (
    <section className={styles.usedFunctions}>
      <img src={Man} alt="man" />
      <div className={styles.usedFunctions__info}>
        <h2>We Provide Many Features You Can Use</h2>
        <p>
          You can explore the features that we provide with fun and have their
          own functions each feature
        </p>
        <div className={styles.info__list}>
          {features.map((title, index) => (
            <div
              data-testid={`${title}`}
              className={styles.list__items}
              key={index}
            >
              <img src={Check} alt="check" />
              <p>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsedFunctions;
