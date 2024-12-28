import { FC, useState } from "react";
import Accordion from "@/components/Accordion/Accordion.tsx";
import styles from "./FAQ.module.css";
import { faqs, faqUsingCard } from "@/constants/constants.tsx";
import { IAccordion } from "@/components/types.ts";

const Faq: FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<IAccordion | null>(
    null,
  );

  const onClickAccordion = (accordion: IAccordion) => {
    setActiveAccordion(activeAccordion?.id === accordion.id ? null : accordion);
  };

  return (
    <div className={styles.faq}>
      <div className={styles.faq__block}>
        <p className={styles.faq__title}>Issuing and receiving a card</p>
        <Accordion
          accordions={faqs}
          activeAccordion={activeAccordion}
          onClick={onClickAccordion}
        />
      </div>
      <div className={styles.faq__block}>
        <p className={styles.faq__title}>Using a credit card</p>
        <Accordion
          accordions={faqUsingCard}
          activeAccordion={activeAccordion}
          onClick={onClickAccordion}
        />
      </div>
    </div>
  );
};

export default Faq;
