import { describe, expect, it } from "vitest";
import AboutCardTabs from "../AboutCardTabs.tsx";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("AboutCardTabs", () => {
  it("отображается компонент AboutCard", () => {
    render(<AboutCardTabs />);
    const aboutCardBlock = screen.queryByText(
      "Cash and transfers without commission and percent",
    );
    expect(aboutCardBlock).toBeInTheDocument();
  });
  it("отображается компонент RatesAndConditions", () => {
    render(<AboutCardTabs />);
    const button = screen.getByTestId("tabsButton2");
    fireEvent.click(button);
    waitFor(() => {
      const ratesAndConditionsBlock = screen.queryByText("0% up to 160 days");
      expect(ratesAndConditionsBlock).toBeInTheDocument();
    });
  });
  it("отображается компонент cashback", () => {
    render(<AboutCardTabs />);
    const button = screen.getByTestId("tabsButton3");
    fireEvent.click(button);
    waitFor(() => {
      const cashbackBlock = screen.queryByText(
        "For food delivery, cafes and restaurants",
      );
      expect(cashbackBlock).toBeInTheDocument();
    });
  });
  it("отображается компонент faq", () => {
    render(<AboutCardTabs />);
    const button = screen.getByTestId("tabsButton4");
    fireEvent.click(button);
    waitFor(() => {
      const faqBlock = screen.queryByText("How to get a card?");
      expect(faqBlock).toBeInTheDocument();
    });
  });
});
