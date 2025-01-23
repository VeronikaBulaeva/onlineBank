import { FC } from "react";
import styles from "./CardDesign.module.css";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import { card } from "@/constants/constants.tsx";
import { CREDIT_CARD_ROUTE } from "@/constants/routes.ts";

const CardDesign: FC = () => {
  return (
    <section className={styles.cardDesign}>
      <div className={styles.cardDesign__choose}>
        <h1>Choose the design you like and apply for card right now</h1>
        <DefaultButton
          buttonType={ButtonType.link}
          className={styles.radius}
          link={CREDIT_CARD_ROUTE}
        >
          Choose the card
        </DefaultButton>
      </div>
      <div className={styles.cardDesign__design}>
        {card.map(({ img, alt }, index) => (
          <img data-testid={alt + index} src={img} alt={alt} key={index} />
        ))}
      </div>
    </section>
  );
};

export default CardDesign;
