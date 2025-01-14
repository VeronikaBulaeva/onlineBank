import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDocument, getCreditDataById } from "@/rest/requests.ts";
import Table from "@/components/shared/table/Table.tsx";
import styles from "./DocumentPage.module.css";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import { TableContentType } from "@/components/shared/table/types.ts";
import TextBlock from "@/components/shared/TextBlock/TextBlock.tsx";
import Loader from "@/components/shared/Loader/Loader.tsx";
import useCompareIds from "@/lib/useCompareIds.ts";
import Modal from "@/components/shared/modal/Modal.tsx";
import Close from "@/assets/close_square.svg";
import { removeApplicationId } from "@/app/store/slices/creditSlice.ts";
import { HOME_PAGE_ROUTE } from "@/constants/routes.ts";
import { useAppDispatch } from "@/app/store/hooks.ts";
import useStep from "@/lib/useStep.ts";

const columns = [
  "number",
  "date",
  "total payment",
  "interest payment",
  "debt payment",
  "remaining debt",
];

const STEP = 3;

const DocumentPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isDocumentCreated, setIsDocumentCreated] = useState(false);
  const [content, setContent] = useState<TableContentType[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [modalDenyActive, setModalDenyActive] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const timeoutId = useRef<NodeJS.Timeout>();

  const modalClosing = () => {
    setModalActive(false);
  };

  const handleClick = async () => {
    setIsLoading(true);
    if (id) {
      const response = await createDocument(id).finally(() => {
        setIsLoading(false);
      });
      if (response.status === 200) {
        setIsDocumentCreated(true);
      }
    }
  };

  const goHome = async (id: number) => {
    await dispatch(removeApplicationId(id));
    navigate(HOME_PAGE_ROUTE);
  };

  const denyClick = async () => {
    if (id) {
      timeoutId.current = setTimeout(() => {
        goHome(+id);
      }, 10 * 1000);
    }
  };

  useCompareIds(id);
  useStep(STEP, id);

  useEffect(() => {
    if (id) {
      getCreditDataById(id).then((response) => {
        setContent(response.data.credit.paymentSchedule);
      });
    }
  }, [id]);

  useEffect(() => {
    return () => {
      clearInterval(timeoutId.current);
    };
  }, []);

  return (
    <div className={`${styles.wrapper} ${isDocumentCreated && styles.padding}`}>
      {isLoading && <Loader />}
      {isDocumentCreated ? (
        <TextBlock
          title={"Documents are formed"}
          description={"Documents for signing will be sent to your email"}
        />
      ) : (
        <div className={styles.block}>
          <div className={styles.block__top}>
            <div className={styles.block__text}>
              <p className={styles.block__title}>Payment Schedule</p>
              <p className={styles.block__step}>Step 3 of 5</p>
            </div>
          </div>
          <Table columns={columns} content={content} />
          <div className={styles.block__bottom}>
            <div className={styles.bottom__sendBlock}>
              <DefaultButton
                buttonType={ButtonType.button}
                className={styles.deny__button}
                onClick={() => setModalActive(true)}
              >
                Deny
              </DefaultButton>

              <label className={styles.block__checkbox}>
                <input
                  type={"checkbox"}
                  className={styles.checkbox}
                  onChange={() => setDisable(!disable)}
                />
                <p className={styles.checkbox__text}>
                  I agree with the payment schedule
                </p>
              </label>
            </div>
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
      <Modal active={modalActive} onClose={modalClosing}>
        <div className={styles.modal__top}>
          <p className={styles.modal__title}>Deny application</p>
          <button className={styles.modal__close} onClick={modalClosing}>
            <img className={styles.modal__img} src={Close} alt="close" />
          </button>
        </div>
        <p className={styles.modal__text}>
          You exactly sure, you want to cancel this application?
        </p>
        <div className={styles.modal__bottom}>
          <DefaultButton
            buttonType={ButtonType.button}
            className={styles.deny__button}
            onClick={() => {
              setModalDenyActive(true);
              modalClosing();
              denyClick();
            }}
          >
            Deny
          </DefaultButton>
          <DefaultButton
            buttonType={ButtonType.button}
            className={styles.send__button}
            onClick={modalClosing}
          >
            Cancel
          </DefaultButton>
        </div>
      </Modal>
      <Modal active={modalDenyActive} onClose={() => id && goHome(+id)}>
        <div className={styles.modal__top}>
          <p className={styles.modal__title}>Deny application</p>
          <button
            className={styles.modal__close}
            onClick={() => id && goHome(+id)}
          >
            <img className={styles.modal__img} src={Close} alt="close" />
          </button>
        </div>
        <p className={styles.modal__text}>
          You exactly sure, you want to cancel this application?
        </p>
        <div className={styles.modal__bottom}>
          <DefaultButton
            buttonType={ButtonType.button}
            className={styles.send__button}
            onClick={() => id && goHome(+id)}
          >
            Go home
          </DefaultButton>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentPage;
