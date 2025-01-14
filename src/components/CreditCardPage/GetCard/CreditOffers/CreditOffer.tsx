import { FC } from "react";
import { CreditOfferType } from "@/components/types.ts";
import styles from "./CreditOffer.module.css";
import OfferImage from "@/assets/surpriseBox.svg";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import Success from "@/assets/checkTrue.svg";
import Error from "@/assets/checkFalse.svg";
import { selectOffer } from "@/rest/requests.ts";
import { useAppDispatch } from "@/app/store/hooks.ts";
import {
  setAppIdStep,
  setApplicationId,
  setCreditOffers,
} from "@/app/store/slices/creditSlice.ts";

const CreditOffer: FC<CreditOfferType> = (offer) => {
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    await selectOffer(offer);
    dispatch(setCreditOffers(null));
    dispatch(setApplicationId(offer.applicationId));
    dispatch(setAppIdStep({ id: offer.applicationId.toString(), step: 1 }));
  };

  const {
    requestedAmount,
    totalAmount,
    monthlyPayment,
    isSalaryClient,
    rate,
    term,
    isInsuranceEnabled,
  } = offer;

  return (
    <div className={styles.offer}>
      <img src={OfferImage} alt="offer" width={150} height={150} />
      <div className={styles.offer__description}>
        <p className={styles.text}>
          Requested amount: {requestedAmount.toLocaleString()} ₽
        </p>
        <p className={styles.text}>
          Total amount: {totalAmount.toLocaleString()} ₽
        </p>
        <p className={styles.text}>For {term} months</p>
        <p className={styles.text}>
          Monthly payment: {monthlyPayment.toLocaleString()} ₽
        </p>
        <p className={styles.text}>Your rate: {rate}%</p>
        <p className={`${styles.boolean} ${styles.text}`}>
          Insurance included
          <img
            src={isInsuranceEnabled ? Success : Error}
            alt={isInsuranceEnabled ? "yes" : "no"}
            width={18}
            height={18}
          />
        </p>
        <p className={`${styles.boolean} ${styles.text}`}>
          Salary client
          <img
            src={isSalaryClient ? Success : Error}
            alt={isSalaryClient ? "yes" : "no"}
            width={18}
            height={18}
          />
        </p>
      </div>
      <DefaultButton
        buttonType={ButtonType.button}
        className={styles.button}
        onClick={handleClick}
      >
        Select
      </DefaultButton>
    </div>
  );
};

export default CreditOffer;
