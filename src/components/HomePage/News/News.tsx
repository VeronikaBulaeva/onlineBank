import { FC, TouchEventHandler, useRef, useState } from "react";
import NewsCard from "./NewsCard/NewsCard.tsx";
import styles from "./News.module.css";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import ArrowLeft from "@/assets/arrowLeft.svg";
import ArrowRight from "@/assets/arrowRight.svg";
import { NewsData } from "@/components/types.ts";

const News: FC<NewsData> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<number | null>(null);
  const isSmallScreen = window.innerWidth <= 600;
  const lastIndex = isSmallScreen ? articles.length - 1 : articles.length - 3;
  const startSlide = activeIndex === 0;
  const endSlide = activeIndex === lastIndex;
  const isEdge = startSlide || endSlide;

  const prevSlide = () => {
    if (activeIndex === 0) {
      setActiveIndex(lastIndex);
    } else {
      setActiveIndex((prevState) => prevState - 1);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prevState) => prevState + 1);
  };
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    ref.current = e.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (isEdge) {
      return null;
    }

    const touchDown = ref.current;
    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextSlide();
    } else if (diff < -5) {
      prevSlide();
    }
    ref.current = null;
  };

  return (
    <section className={styles.news__section}>
      <div>
        <h2>Current news from the world of finance</h2>
        <p className={styles.section__description}>
          We update the news feed every 15 minutes. You can learn more by
          clicking on the news you are interested in.
        </p>
      </div>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={styles.news__items}
      >
        {articles ? (
          articles.map((item, index) => (
            <NewsCard
              key={index + item.title}
              {...item}
              activeIndex={activeIndex}
            />
          ))
        ) : (
          <p className={styles.section__description}>Пока новостей нет(</p>
        )}
      </div>
      <div className={styles.items__buttons}>
        <DefaultButton
          buttonType={ButtonType.button}
          onClick={prevSlide}
          className={`${startSlide ? styles.disabled : styles.buttonLeft} ${styles.radius}`}
          disabled={startSlide}
        >
          <img src={ArrowLeft} alt="left" />
        </DefaultButton>
        <DefaultButton
          buttonType={ButtonType.button}
          onClick={nextSlide}
          className={`${endSlide ? styles.disabled : ""} ${styles.radius}`}
          disabled={endSlide}
        >
          <img src={ArrowRight} alt="right" />
        </DefaultButton>
      </div>
    </section>
  );
};

export default News;
