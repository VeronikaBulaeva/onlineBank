import { FC, ReactEventHandler, SyntheticEvent } from "react";
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
  const getSubstring = (string: string) => {
    return string.length > 100 ? string.substring(0, 100) + "..." : string;
  };

  const handleError: ReactEventHandler<HTMLImageElement> | undefined = ({
    currentTarget,
  }: SyntheticEvent<HTMLImageElement>) => {
    currentTarget.onerror = null;
    currentTarget.src = NewsImg;
  };

  const slideImageStyle = `translateX(calc(-${activeIndex * 100}% - ${80 * activeIndex}px))`;

  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.newsCard}
      style={{
        transform: slideImageStyle,
      }}
    >
      <div className={styles.newsCard__item}>
        <div className={styles.item__img}>
          <img src={urlToImage} alt="image" onError={handleError} />
        </div>
        <p className={styles.newsCard__title}>{getSubstring(title)}</p>
        <p className={styles.newsCard__description}>
          {getSubstring(description)}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
