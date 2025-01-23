import { FC } from "react";
import styles from "./Accordion.module.css";
import Arrow from "@/assets/arrowUp.svg";
import { AccordionProps } from "@/components/types.ts";

const Accordion: FC<AccordionProps> = ({
  accordions,
  onClick,
  activeAccordion,
}) => {
  return (
    <div className={styles.accordions}>
      {accordions.map((accordion, index) => (
        <div key={index} className={styles.accordion__block}>
          <button
            data-testid={`arrowButton${accordion.id}`}
            className={styles.accordion__button}
            onClick={() => onClick(accordion)}
          >
            <p className={styles.accordion__question}>{accordion.question}</p>
            <img
              src={Arrow}
              alt="arrow"
              className={
                activeAccordion?.id === accordion.id
                  ? styles.arrowIcon
                  : styles.rotate
              }
            />
          </button>
          <div
            data-testid={`answerBlock${accordion.id}`}
            className={
              activeAccordion?.id === accordion.id
                ? styles.activeAccordion
                : styles.accordion
            }
          >
            <p className={styles.accordion__answer}>{accordion.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
