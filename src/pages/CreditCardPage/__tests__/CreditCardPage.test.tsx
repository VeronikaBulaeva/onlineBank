import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import CreditCardPage from "../CreditCardPage.tsx";

describe("CreditCardPage", () => {
  it("Отрисовка компонента", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <CreditCardPage />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
