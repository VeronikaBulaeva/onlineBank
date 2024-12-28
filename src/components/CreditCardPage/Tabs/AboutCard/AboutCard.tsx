import { FC } from "react";
import { aboutCard } from "@/constants/constants.tsx";
import styles from "./AboutCard.module.css";

const AboutCard: FC = () => {
  return (
    <div className={styles.aboutCard}>
      {aboutCard.map(({ img, title, description }, index) => (
        <div className={styles.aboutCard__item} key={index}>
          <img src={img} alt="image" />
          <p className={styles.item__title}>{title}</p>
          <p className={styles.item__description}>{description}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutCard;
