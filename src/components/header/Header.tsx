import { FC } from "react";
import styles from "./header.module.css";
import DefaultButton from "@/components/button/button.tsx";
import { ButtonRadius, ButtonType } from "@/components/button/types.ts";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>NeoBank</h1>
      <nav className={styles.header__menu}>
        <Link to={""}>Credit card</Link>
        <Link to={""}>Product</Link>
        <Link to={""}>Account</Link>
        <Link to={""}>Resources</Link>
      </nav>
      <DefaultButton type={ButtonType.link} radius={ButtonRadius.sixteen}>
        <p>Online Bank</p>
      </DefaultButton>
    </header>
  );
};

export default Header;
