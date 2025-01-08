import styles from "./Loader.module.css";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className={styles.loader__container}>
      <div className={styles.loader}></div>
    </div>
  );
};
export default Loader;