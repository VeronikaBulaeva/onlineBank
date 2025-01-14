import { FC } from "react";
import styles from "./notFoundPage.module.css";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import ErrorImage from "@/assets/error404.svg";
import { HOME_PAGE_ROUTE } from "@/constants/routes.ts";

const NotFoundPage: FC = () => {
  return (
    <section className={styles.errorPage}>
      <div className={styles.textBlock}>
        <p className={styles.textBlock__title}>Oops....</p>
        <p className={styles.textBlock__text}>Page not found</p>
        <p className={styles.textBlock__description}>
          This Page doesn`t exist or was removed! We suggest you go back.
        </p>
        <DefaultButton
          buttonType={ButtonType.link}
          className={styles.button}
          link={HOME_PAGE_ROUTE}
        >
          <p>Go back</p>
        </DefaultButton>
      </div>
      <div>
        <img src={ErrorImage} alt="error" />
      </div>
    </section>
  );
};

export default NotFoundPage;
