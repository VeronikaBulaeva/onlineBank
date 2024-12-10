import { FC } from "react";
import styles from "./NewsCard.module.css";
import { Link } from "react-router-dom";
import NewsImg from "@/assets/newsError.jpg";
import { NewsProps } from "@/components/types.ts";

interface NewsCardProps extends NewsProps {
  activeIndex: number;
}

const NewsCard: FC<NewsCardProps> = ({
  url,
  urlToImage,
  title,
  description,
  activeIndex,
}) => {
  const descriptionSubstring = description?.substring(0, 100) + "...";

  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.newsCard}
      style={{
        transform: `translateX(calc(-${activeIndex * 100}% - ${80 * activeIndex}px))`,
      }}
    >
      <div className={styles.newsCard__item}>
        <div className={styles.item__img}>
          <img
            src={urlToImage}
            alt="image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NewsImg;
            }}
          />
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: title }}
          className={styles.newsCard__title}
        ></p>
        <p
          dangerouslySetInnerHTML={{ __html: descriptionSubstring }}
          className={styles.newsCard__description}
        ></p>
      </div>
    </Link>
  );
};

export default NewsCard;
