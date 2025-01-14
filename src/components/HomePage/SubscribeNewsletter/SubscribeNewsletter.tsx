import { FC } from "react";
import styles from "./SubscribeNewsletter.module.css";
import SubscribeInput from "@/components/shared/SubscribeInput/SubscribeInput.tsx";

const SubscribeNewsletter: FC = () => {
  return (
    <section className={styles.subscribe}>
      <p className={styles.subscribe__support}>Support</p>
      <p className={styles.subscribe__newsletter}>Subscribe Newsletter & get</p>
      <p className={styles.subscribe__banknews}>Bank News</p>
      <SubscribeInput />
    </section>
  );
};

export default SubscribeNewsletter;
