import { CreditOfferType } from "@/components/types.ts";
import styles from "./GetCard.module.css";
import CreditOffer from "./CreditOffers/CreditOffer.tsx";
import CustomizeCardForm from "./CustomizeCardForm/CustomizeCardForm.tsx";
import TextBlock from "@/components/shared/TextBlock/TextBlock.tsx";

const getOffersContent = (offers: CreditOfferType[] | null) => {
  if (!offers) {
    return (
      <div className={styles.email__block} data-testid="chosenOffer">
        <TextBlock
          title="The preliminary decision has been sent to your email."
          description="In the letter you can get acquainted with the preliminary decision on
        the credit card."
        />
      </div>
    );
  }
  if (offers.length) {
    return (
      <div className={styles.offers} data-testid="offers">
        {offers.map((offer, index) => (
          <CreditOffer {...offer} key={index + offer.applicationId} />
        ))}
      </div>
    );
  } else {
    return <CustomizeCardForm />;
  }
};

export default getOffersContent;
