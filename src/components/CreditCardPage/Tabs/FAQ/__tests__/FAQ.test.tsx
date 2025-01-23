import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FAQ from "../FAQ.tsx";

describe("FAQ", () => {
  it("FAQ", () => {
    render(<FAQ />);
    const answerBlock = screen.getByTestId("answerBlock1");
    expect(answerBlock?.className.includes("activeAccordion")).not.toBeTruthy();
    const arrowButton = screen.getByTestId("arrowButton1");
    fireEvent.click(arrowButton);
    expect(answerBlock?.className.includes("activeAccordion")).toBeTruthy();
    fireEvent.click(arrowButton);
    expect(answerBlock?.className.includes("activeAccordion")).not.toBeTruthy();
  });
});
