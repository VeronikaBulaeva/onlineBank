import { FC, useEffect, useRef, useState } from "react";
import styles from "./exchangeRate.module.css";
import { currency } from "@/constants/constants.tsx";
import Bank from "@/assets/bank.svg";
import { getCurrency } from "@/rest/requests.ts";

const ExchangeRate: FC = () => {
  const [data, setData] = useState<Record<string, number> | undefined>();

  const intervalId = useRef<NodeJS.Timeout>();

  const getData = async () => {
    const response = await getCurrency();
    setData(response);
  };

  useEffect(() => {
    getData();
    intervalId.current = setInterval(
      () => {
        getData();
      },
      15 * 60 * 1000,
    );
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const getDate = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    return [currentYear, currentMonth, currentDay].reverse().join(".");
  };

  return (
    <section className={styles.exchangeRate}>
      <div className={styles.exchangeRate__currency}>
        <h2>Exchange rate in internet bank</h2>
        <p className={styles.exchangeRate__text}>Currency</p>
        <div className={styles.currency__block}>
          {data ? (
            currency.map((item, index) => (
              <div key={index + item} className={styles.block__item}>
                <p className={styles.item__name}>{item}:</p>
                <p className={styles.item__rate}>
                  {(1 / data[item]).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p className={styles.exchangeRate__text}>
              Не удалось получить данные
            </p>
          )}
        </div>
        <p className={styles.exchangeRate__courses}>All courses</p>
      </div>
      <div className={styles.exchangeRate__update}>
        <p>{`Update every 15 minutes, MSC ${getDate()}`}</p>
        <img src={Bank} alt="bank" />
      </div>
    </section>
  );
};

export default ExchangeRate;
