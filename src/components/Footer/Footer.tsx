import { FC } from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import { footerLinks } from "@/constants/constants.tsx";

const Footer: FC = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <section className={styles.footer__top}>
          <div className={styles.footer__social}>
            <img src={Logo} alt="logo" />
            <address className={styles.footer__info}>
              <a href="tel:+74959842513">+7 (495) 984 25 13</a>
              <a href="mailto:info@neoflex.ru">info@neoflex.ru</a>
            </address>
          </div>
          <nav className={styles.footer__menu}>
            {footerLinks.map(({ link, title }, index) => (
              <Link to={link} key={index}>
                {title}
              </Link>
            ))}
          </nav>
        </section>
        <section className={styles.footer__bottom}>
          <p>
            We use cookies to personalize our services and improve the user
            experience of our website. Cookies are small files containing
            information about previous visits to a website. If you do not want
            to use cookies, please change your browser settings
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
