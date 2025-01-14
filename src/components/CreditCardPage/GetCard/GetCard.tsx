import { FC } from "react";
import styles from "./GetCard.module.css";
import Divider from "@/components/shared/Divider/Divider.tsx";
import { getCardInfo } from "@/constants/constants.tsx";
import CustomizeCardForm from "@/components/CreditCardPage/GetCard/CustomizeCardForm/CustomizeCardForm.tsx";

const GetCard: FC = () => {
  return (
    <section className={styles.getCard} id="getCard">
      <h2 className={styles.getCard__title}>How to get a card</h2>
      <div className={styles.getCard__block}>
        {getCardInfo.map(({ text, id }) => (
          <div className={styles.block__item} key={id}>
            <div className={styles.item__step}>
              <div className={styles.step__number}>
                <p className={styles.step__text}>{id}</p>
              </div>
              <Divider />
            </div>
            <p className={styles.item__text}>{text}</p>
          </div>
        ))}
      </div>
      <CustomizeCardForm />
    </section>
  );
};

export default GetCard;
