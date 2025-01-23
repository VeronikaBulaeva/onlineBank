import { FC } from "react";
import styles from "./header.module.css";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import { Link, NavLink } from "react-router-dom";
import { headerLinks } from "@/constants/constants.tsx";
import { HOME_PAGE_ROUTE } from "@/constants/routes.ts";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link to={HOME_PAGE_ROUTE} className={styles.header__logo}>
        NeoBank
      </Link>
      <nav className={styles.header__menu}>
        {headerLinks.map(({ link, title }, index) => (
          <NavLink
            data-testid={title}
            to={link}
            key={index}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            {title}
          </NavLink>
        ))}
      </nav>
      <DefaultButton buttonType={ButtonType.link} className={styles.radius}>
        <p>Online Bank</p>
      </DefaultButton>
    </header>
  );
};

export default Header;
