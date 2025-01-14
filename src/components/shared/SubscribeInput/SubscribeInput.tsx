import { FC, useRef, useState } from "react";
import styles from "./SubscribeInput.module.css";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import Subscribe from "@/assets/subscribe.svg";
import Email from "@/assets/email.svg";
import { sendEmail } from "@/rest/requests.ts";
import { getCookie } from "@/lib/getCookie.ts";

const SubscribeInput: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(
    !!getCookie("subscribed"),
  );

  const handleClick = async () => {
    if (ref.current) {
      const response = await sendEmail(ref.current.value);
      if (response.status === 200) {
        ref.current.value = "";
        document.cookie = "subscribed=true";
        setIsSubscribed(true);
      }
    }
  };

  return (
    <div className={styles.inputBox}>
      {isSubscribed ? (
        <p>You are already subscribed to the bank's newsletter</p>
      ) : (
        <>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            ref={ref}
            className={styles.input}
          />
          <img
            width="27"
            height="37"
            src={Email}
            alt="email"
            className={styles.inputBox__img}
          />
          <DefaultButton
            className={styles.inputBox__button}
            buttonType={ButtonType.button}
            onClick={handleClick}
          >
            <img width="24" height="22" src={Subscribe} alt="subscribe" />
            <p>Subscribe</p>
          </DefaultButton>
        </>
      )}
    </div>
  );
};

export default SubscribeInput;
