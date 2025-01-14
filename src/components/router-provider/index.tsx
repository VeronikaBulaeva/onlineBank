import { FC, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.tsx";
import {
  CREDIT_CARD_ROUTE,
  GENERAL_ROUTE,
  HOME_PAGE_ROUTE,
} from "@/constants/routes.ts";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import CreditCardPage from "@/pages/CreditCardPage/CreditCardPage.tsx";

const AppRouterProvider: FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes location={location}>
      <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
      <Route path={CREDIT_CARD_ROUTE} element={<CreditCardPage />} />
      <Route path={GENERAL_ROUTE} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouterProvider;
