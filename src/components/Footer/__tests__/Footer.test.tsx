import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer/Footer.tsx";
import { BrowserRouter as Router } from "react-router-dom";

describe("Footer", () => {
  it("Footer", () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );
    const tel = screen.getByTestId("footerTel");
    expect(tel).toHaveAttribute("href", "tel:+74959842513");
    const mail = screen.getByTestId("footerMail");
    expect(mail).toHaveAttribute("href", "mailto:info@neoflex.ru");
  });
});
