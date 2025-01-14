import { FC } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  text: string;
  tooltipClass?: string;
  textClass?: string;
}

const Tooltip: FC<TooltipProps> = ({ text, tooltipClass, textClass }) => {
  return (
    <div className={`${styles.tooltip} ${tooltipClass}`}>
      <p className={`${styles.tooltip__text} ${textClass}`}>{text}</p>
    </div>
  );
};

export default Tooltip;
