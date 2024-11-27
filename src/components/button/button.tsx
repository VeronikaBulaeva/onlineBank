import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.css";
import { ButtonProps, ButtonRadius } from "./types";

const DefaultButton: FC<PropsWithChildren<ButtonProps>> = ({
  link,
  className = "",
  type,
  radius,
  children,
  onClick,
}) => {
  const getClassName = () => {
    switch (radius) {
      case ButtonRadius.eight:
        return styles.radius8;
      case ButtonRadius.sixteen:
        return styles.radius16;
      case ButtonRadius.twenty:
        return styles.radius20;
      default:
        return styles.radius16;
    }
  };
  return type === "link" && link ? (
    <Link
      className={`${styles.button} ${className} ${getClassName()}`}
      to={link}
      onClick={onClick}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${styles.button} ${className} ${getClassName()}`}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
