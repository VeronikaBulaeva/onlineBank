import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styles from "./DefaultButton.module.css";
import { ButtonProps } from "./types.ts";

const DefaultButton: FC<
  PropsWithChildren<
    ButtonProps & Partial<ButtonHTMLAttributes<HTMLButtonElement>>
  >
> = ({
  link,
  className = "",
  buttonType,
  children,
  onClick,
  disabled,
  ...rest
}) => {
  return buttonType === "link" && link ? (
    <Link
      className={`${styles.button} ${className}`}
      to={link}
      onClick={onClick}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
