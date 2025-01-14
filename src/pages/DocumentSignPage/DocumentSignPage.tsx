import { FC, useState } from "react";
import styles from "./DocumentSignPage.module.css";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import { Link, useParams } from "react-router-dom";
import File from "@/assets/file.svg";
import PDF from "@/assets/credit-card-offer.pdf";
import { signDocument } from "@/rest/requests.ts";
import TextBlock from "@/components/shared/TextBlock/TextBlock.tsx";
import Loader from "@/components/shared/Loader/Loader.tsx";
import useCompareIds from "@/lib/useCompareIds.ts";
import useStep from "@/lib/useStep.ts";

const STEP = 4;

const DocumentSignPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isDocumentSigned, setIsDocumentSigned] = useState(false);

  const { id } = useParams<{ id: string }>();

  const handleClick = async () => {
    setIsLoading(true);
    if (id) {
      const response = await signDocument(id).finally(() => {
        setIsLoading(false);
      });
      if (response.status === 200) {
        setIsDocumentSigned(true);
      }
    }
  };

  useCompareIds(id);
  useStep(STEP, id);

  return (
    <div className={`${styles.wrapper} ${styles.padding}`}>
      {isLoading && <Loader />}
      {isDocumentSigned ? (
        <TextBlock
          title={
            "Documents have been successfully signed and sent for approval"
          }
          description={
            "Within 10 minutes you will be sent a PIN code to your email for confirmation"
          }
        />
      ) : (
        <div className={styles.block}>
          <div className={styles.block__text}>
            <p className={styles.block__title}>Signing of documents</p>
            <p className={styles.block__step}>Step 4 of 5</p>
          </div>
          <p className={styles.block__information}>
            Information on interest rates under bank deposit agreements with
            individuals. Center for Corporate Information Disclosure.
            Information of a professional participant in the securities market.
            Information about persons under whose control or significant
            influence the Partner Banks are. By leaving an application, you
            agree to the processing of personal data, obtaining information,
            obtaining access to a credit history, using an analogue of a
            handwritten signature, an offer, a policy regarding the processing
            of personal data, a form of consent to the processing of personal
            data.
          </p>
          <Link
            to={PDF}
            target="_blank"
            download="Credit_Offer"
            className={styles.block__pdf}
          >
            <img src={File} alt="file" />
            <p>Information on your card</p>
          </Link>
          <div className={styles.block__agree}>
            <label className={styles.block__checkbox}>
              <input
                type={"checkbox"}
                className={styles.checkbox}
                onChange={() => setDisable(!disable)}
              />
              <p className={styles.checkbox__text}>I agree</p>
            </label>
            <DefaultButton
              buttonType={ButtonType.button}
              className={`${disable && styles.disabled} ${styles.send__button}`}
              disabled={disable}
              onClick={handleClick}
            >
              Send
            </DefaultButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentSignPage;
