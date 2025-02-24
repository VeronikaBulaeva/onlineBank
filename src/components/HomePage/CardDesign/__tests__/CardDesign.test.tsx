import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import CardDesign from "../CardDesign.tsx";
import { BrowserRouter as Router } from "react-router-dom";

describe("CardDesign", () => {
  it("Тест отрисовки компонента", () => {
    const { queryByText, queryByTestId } = render(
      <Router>
        <CardDesign />
      </Router>,
    );
    const title = queryByText(
      "Choose the design you like and apply for card right now",
    );
    const image = queryByTestId("design10");
    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
