import { FC } from "react";
import styles from "./ApplyCard.module.css";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import CreditCardImg from "@/assets/creditCard.png";
import { featuresCard } from "@/constants/constants.tsx";
import FeaturesCard from "@/components/CreditCardPage/ApplyCard/FeaturesCard/FeaturesCard.tsx";
import { useAppSelector } from "@/app/store/hooks.ts";
import { creditOffersSelector } from "@/app/store/slices/creditSlice.ts";

const ApplyCard: FC = () => {
  const offers = useAppSelector(creditOffersSelector);

  const scrollToElement = () => {
    document.getElementById("getCard")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.applyCard}>
      <div className={styles.applyCard__information}>
        <h1 className={styles.applyCard__title}>
          Platinum digital credit card
        </h1>
        <p className={styles.applyCard__description}>
          Our best credit card. Suitable for everyday spending and shopping.
          Cash withdrawals and transfers without commission and interest.
        </p>
        <div className={styles.cardInformation}>
          {featuresCard.map((features, index) => (
            <FeaturesCard {...features} key={index} />
          ))}
        </div>
        <DefaultButton
          buttonType={ButtonType.link}
          className={styles.applyCard__button}
          onClick={scrollToElement}
        >
          <p>
            {offers
              ? offers.length
                ? "Choose an offer"
                : "Apply for card"
              : "Continue registration"}
          </p>
        </DefaultButton>
      </div>
      <div>
        <img src={CreditCardImg} alt="credit card" width="380" height="226" />
      </div>
    </section>
  );
};

export default ApplyCard;
