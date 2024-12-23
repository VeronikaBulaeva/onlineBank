import { FC, useEffect, useRef, useState } from "react";
import styles from "./homePage.module.css";
import Map from "@/assets/globalServices.svg";
import News from "@/components/News/News.tsx";
import { getNews } from "@/rest/requests.ts";
import SubscribeNewsletter from "@/components/SubscribeNewsletter/SubscribeNewsletter.tsx";
import UsedFunctions from "@/components/UsedFunctions/UsedFunctions.tsx";
import CardDesign from "@/components/CardDesign/CardDesign.tsx";
import { NewsProps } from "@/components/types.ts";
import ExchangeRate from "@/components/ExchangeRate/ExchangeRate.tsx";

const HomePage: FC = () => {
  const [data, setData] = useState<NewsProps[]>([]);
  const intervalId = useRef<NodeJS.Timeout>();

  const getData = () => {
    getNews().then((response) => {
      if (response) {
        setData(response);
      }
    });
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

  const filteredData = data.filter(
    (value) =>
      value.description &&
      value.description !== "[Removed]" &&
      value.urlToImage,
  );

  return (
    <main className={styles.homePage}>
      <CardDesign />
      <UsedFunctions />
      <ExchangeRate />
      <section className={styles.ourServices}>
        <h3>You can use our services anywhere in the world</h3>
        <p>Withdraw and transfer money online through our application</p>
        <img src={Map} alt="map" width="1060" height="538" />
      </section>
      <News articles={filteredData} />
      <SubscribeNewsletter />
    </main>
  );
};

export default HomePage;
