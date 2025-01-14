import { FC } from "react";
import styles from "./ConfirmationCodePage.module.css";
import CodeConfirmation from "@/components/CodeConfirmation/CodeConfirmation.tsx";
import useStep from "@/lib/useStep.ts";
import { useParams } from "react-router-dom";

const STEP = 5;

const ConfirmationCodePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  useStep(STEP, id);

  return (
    <div className={styles.wrapper}>
      <CodeConfirmation />
    </div>
  );
};

export default ConfirmationCodePage;
