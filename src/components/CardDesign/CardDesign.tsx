import { FC } from "react";
import styles from "./CardDesign.module.css";
import DefaultButton from "@/components/DefaultButton/DefaultButton.tsx";
import { ButtonRadius, ButtonType } from "@/components/DefaultButton/types.ts";
import { card } from "@/constants/constants.tsx";

const CardDesign: FC = () => {
  return (
    <section className={styles.cardDesign}>
      <div className={styles.cardDesign__choose}>
        <h1>Choose the design you like and apply for card right now</h1>
        <DefaultButton
          type={ButtonType.link}
          radius={ButtonRadius.sixteen}
          link={""}
        >
          Choose the card
        </DefaultButton>
      </div>
      <div className={styles.cardDesign__design}>
        {card.map(({ img, alt }, index) => (
          <img src={img} alt={alt} key={index} />
        ))}
      </div>
    </section>
  );
};

export default CardDesign;
