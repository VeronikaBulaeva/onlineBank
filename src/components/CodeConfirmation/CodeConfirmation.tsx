import { FC, useEffect, useRef, useState } from "react";
import Loader from "@/components/shared/Loader/Loader.tsx";
import styles from "./CodeConfirmation.module.css";
import Ellipse from "@/assets/ellipse.svg";
import { useParams } from "react-router-dom";
import { sendSignCode } from "@/rest/requests.ts";
import useCompareIds from "@/lib/useCompareIds.ts";
import Congratulations from "@/components/Congratulations/Congratulations.tsx";

const codeArray = new Array(4).fill("");

const CodeConfirmation: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSigned, setIsCodeSigned] = useState(false);
  const [isError, setIsError] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useCompareIds(id);

  const sendCode = async () => {
    setIsLoading(true);
    if (id) {
      const response = await sendSignCode(id, code)
        .finally(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
        });

      if (response && response.status === 200) {
        setIsCodeSigned(true);
      }
    }
  };

  useEffect(() => {
    ref.current?.focus();
    if (code.length === 4) {
      sendCode();
    }
  }, [code]);

  return (
    <>
      {isLoading && <Loader />}
      {isCodeSigned ? (
        <Congratulations />
      ) : (
        <div className={styles.grid}>
          <p className={styles.title}>Please enter confirmation code</p>
          <div className={styles.input__block}>
            <input
              type="text"
              onChange={(event) => {
                setCode(event.target.value);
              }}
              ref={ref}
              className={styles.invisible}
            />
            {codeArray.map((_, index) => (
              <p
                className={`${styles.input}`}
                key={index}
                onClick={() => {
                  ref.current?.focus();
                }}
              >
                {code[index] ? (
                  code[index]
                ) : (
                  <img src={Ellipse} alt="ellipse" />
                )}
              </p>
            ))}
          </div>
          {isError && <p className={styles.error}>Invalid confirmation code</p>}
        </div>
      )}
    </>
  );
};

export default CodeConfirmation;
