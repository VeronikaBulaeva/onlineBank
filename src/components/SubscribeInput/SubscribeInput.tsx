import { FC, useRef } from "react";
import styles from "./SubscribeInput.module.css";
import DefaultButton from "@/components/DefaultButton/DefaultButton.tsx";
import { ButtonRadius, ButtonType } from "@/components/DefaultButton/types.ts";
import Subscribe from "@/assets/subscribe.svg";
import Email from "@/assets/email.svg";
import { sendEmail } from "@/rest/requests.ts";

const SubscribeInput: FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (ref.current) {
      await sendEmail(ref.current.value);
      ref.current.value = "";
    }
  };

  return (
    <div className={styles.inputBox}>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        ref={ref}
      />
      <img
        width="27"
        height="37"
        src={Email}
        alt="email"
        className={styles.inputBox__img}
      />
      <DefaultButton
        radius={ButtonRadius.twenty}
        className={styles.inputBox__button}
        type={ButtonType.button}
        onClick={handleClick}
      >
        <img width="24" height="22" src={Subscribe} alt="subscribe" />
        <p>Subscribe</p>
      </DefaultButton>
    </div>
  );
};

export default SubscribeInput;
