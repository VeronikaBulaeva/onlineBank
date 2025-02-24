import { FC, useEffect, useRef } from "react";
import { useAppDispatch } from "@/app/store/hooks.ts";
import { removeApplicationId } from "@/app/store/slices/creditSlice.ts";
import Box from "@/assets/surpriseBox.svg";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import { HOME_PAGE_ROUTE } from "@/constants/routes.ts";
import styles from "./Congratulations.module.css";
import { useNavigate, useParams } from "react-router-dom";

const Congratulations: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const timeoutId = useRef<NodeJS.Timeout>();

  const handleClick = () => {
    if (id) {
      goHome(+id);
    }
  };

  const goHome = async (id: number) => {
    await dispatch(removeApplicationId(id));
    navigate(HOME_PAGE_ROUTE);
  };

  useEffect(() => {
    if (id) {
      timeoutId.current = setTimeout(() => {
        goHome(+id);
      }, 10 * 1000);
    }
    return () => {
      clearInterval(timeoutId.current);
    };
  }, []);

  return (
    <div className={styles.wrapper} data-testid="congratulations">
      <img src={Box} alt="box" width={150} height={150} />
      <p className={styles.title}>
        Congratulations! You have completed your new credit card.
      </p>
      <p className={styles.text}>
        Your credit card will arrive soon. Thank you for choosing us!
      </p>
      <DefaultButton
        buttonType={ButtonType.link}
        link={HOME_PAGE_ROUTE}
        className={styles.button}
        onClick={handleClick}
      >
        View other offers of our bank
      </DefaultButton>
    </div>
  );
};

export default Congratulations;
