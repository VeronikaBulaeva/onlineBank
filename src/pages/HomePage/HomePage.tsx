import { FC, useEffect, useRef, useState } from "react";
import styles from "./homePage.module.css";
import Map from "@/assets/globalServices.svg";
import { getNews } from "@/rest/requests.ts";
import { NewsProps } from "@/components/types.ts";
import CardDesign from "@/components/HomePage/CardDesign/CardDesign.tsx";
import UsedFunctions from "@/components/HomePage/UsedFunctions/UsedFunctions.tsx";
import ExchangeRate from "@/components/HomePage/ExchangeRate/ExchangeRate.tsx";
import News from "@/components/HomePage/News/News.tsx";
import SubscribeNewsletter from "@/components/HomePage/SubscribeNewsletter/SubscribeNewsletter.tsx";

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
