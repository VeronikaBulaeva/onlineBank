import { FC } from "react";
import styles from "./CreditCard.module.css";
import AboutCardTabs from "@/components/CreditCardPage/Tabs/AboutCardTabs.tsx";
import GetCard from "@/components/CreditCardPage/GetCard/GetCard.tsx";
import ApplyCard from "@/components/CreditCardPage/ApplyCard/ApplyCard.tsx";

const CreditCardPage: FC = () => {
  return (
    <main className={styles.creditCardPage}>
      <ApplyCard />
      <AboutCardTabs />
      <GetCard />
    </main>
  );
};

export default CreditCardPage;
