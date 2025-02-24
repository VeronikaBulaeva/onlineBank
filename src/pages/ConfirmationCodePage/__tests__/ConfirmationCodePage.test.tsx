import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ConfirmationCodePage from "../ConfirmationCodePage.tsx";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";

describe("ConfirmationCodePage", () => {
  it("Отрисовка компонента", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <ConfirmationCodePage />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
