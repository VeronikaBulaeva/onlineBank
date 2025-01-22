import { FC } from "react";
import styles from "./TextBlock.module.css";

interface TextBlockProps {
  title: string;
  description: string;
}

const TextBlock: FC<TextBlockProps> = ({ title, description }) => {
  return (
    <div className={styles.text__block}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default TextBlock;
