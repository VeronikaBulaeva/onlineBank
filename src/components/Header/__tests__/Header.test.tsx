import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../Header.tsx";
import { CREDIT_CARD_ROUTE } from "@/constants/routes.ts";

describe("Header", () => {
  it("Header", () => {
    render(
      <Router>
        <Header />
      </Router>,
    );
    const creditCardPage = screen.getByTestId("Credit card");
    expect(creditCardPage).toHaveAttribute("href", CREDIT_CARD_ROUTE);

    fireEvent.click(creditCardPage);
    expect(creditCardPage?.className.includes("active")).toBeTruthy();
  });
});
