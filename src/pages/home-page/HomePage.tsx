import { FC } from "react";
import styles from "./homePage.module.css";
import Map from "@/assets/globalServices.svg";
import DefaultButton from "@/components/button/button.tsx";
import { ButtonRadius, ButtonType } from "@/components/button/types.ts";
import { card, features } from "@/constants/constants.tsx";
import Man from "@/assets/homePageMan.png";
import Check from "@/assets/checkCircle.svg";
import ExchangeRate from "@/components/exchange-rate/ExchangeRate.tsx";
import SubscribeInput from "@/components/SubscribeInput/SubscribeInput.tsx";

const HomePage: FC = () => {
  return (
    <main className={styles.homePage}>
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
              <div className={styles.list__items} key={index}>
                <img src={Check} alt="check" />
                <p>{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ExchangeRate />
      <section className={styles.ourServices}>
        <h3>You can use our services anywhere in the world</h3>
        <p>Withdraw and transfer money online through our application</p>
        <img src={Map} alt="map" width="1060" height="538" />
      </section>
      <section className={styles.newsList}></section>
      <section className={styles.subscribe}>
        <p className={styles.subscribe__support}>Support</p>
        <p className={styles.subscribe__newsletter}>
          Subscribe Newsletter & get
        </p>
        <p className={styles.subscribe__banknews}>Bank News</p>
        <SubscribeInput />
      </section>
    </main>
  );
};

export default HomePage;
