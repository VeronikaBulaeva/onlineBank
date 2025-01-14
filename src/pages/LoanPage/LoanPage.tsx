import { FC } from "react";
import ApplicationIdForm from "@/components/forms/ApplicationIdForm.tsx";
import styles from "./LoanPage.module.css";

const LoanPage: FC = () => {
  return (
    <div className={styles.section}>
      <ApplicationIdForm />
    </div>
  );
};

export default LoanPage;
