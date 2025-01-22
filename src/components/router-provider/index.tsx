import { FC, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.tsx";
import {
  CONFIRMATION_CODE_ROUTE,
  CREDIT_CARD_ROUTE,
  DOCUMENT_ROUTE,
  DOCUMENT_SIGN_ROUTE,
  GENERAL_ROUTE,
  HOME_PAGE_ROUTE,
  LOAN_ROUTE,
} from "@/constants/routes.ts";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import CreditCardPage from "@/pages/CreditCardPage/CreditCardPage.tsx";
import LoanPage from "@/pages/LoanPage/LoanPage.tsx";
import DocumentPage from "@/pages/DocumentPage/DocumentPage.tsx";
import DocumentSignPage from "@/pages/DocumentSignPage/DocumentSignPage.tsx";
import ConfirmationCodePage from "@/pages/ConfirmationCodePage/ConfirmationCodePage.tsx";

const AppRouterProvider: FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes location={location}>
      <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
      <Route path={CREDIT_CARD_ROUTE} element={<CreditCardPage />} />
      <Route path={LOAN_ROUTE} element={<LoanPage />} />
      <Route path={DOCUMENT_ROUTE} element={<DocumentPage />} />
      <Route path={DOCUMENT_SIGN_ROUTE} element={<DocumentSignPage />} />
      <Route
        path={CONFIRMATION_CODE_ROUTE}
        element={<ConfirmationCodePage />}
      />
      <Route path={GENERAL_ROUTE} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouterProvider;
