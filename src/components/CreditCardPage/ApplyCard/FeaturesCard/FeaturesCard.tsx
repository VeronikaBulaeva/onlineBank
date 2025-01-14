import { FC } from "react";
import styles from "./FeaturesCard.module.css";
import Tooltip from "@/components/shared/Tooltip/Tooltip.tsx";

interface FeaturesCardProps {
  title: string;
  description: string;
  tooltip: string;
}

const FeaturesCard: FC<FeaturesCardProps> = ({
  tooltip,
  title,
  description,
}) => {
  return (
    <div className={styles.cardInformation__item}>
      <p className={styles.cardInformation__title}>{title}</p>
      <p className={styles.cardInformation__description}>{description}</p>
      <Tooltip text={tooltip} tooltipClass={styles.cardInformation__tooltip} />
    </div>
  );
};

export default FeaturesCard;
