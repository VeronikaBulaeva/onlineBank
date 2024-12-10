import { FC } from "react";
import styles from "./header.module.css";
import DefaultButton from "@/components/button/button.tsx";
import { ButtonRadius, ButtonType } from "@/components/button/types.ts";
import { Link } from "react-router-dom";
import { headerLinks } from "@/constants/constants.tsx";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>NeoBank</h1>
      <nav className={styles.header__menu}>
        {headerLinks.map(({ link, title }, index) => (
          <Link to={link} key={index}>
            {title}
          </Link>
        ))}
      </nav>
      <DefaultButton type={ButtonType.link} radius={ButtonRadius.sixteen}>
        <p>Online Bank</p>
      </DefaultButton>
    </header>
  );
};

export default Header;
