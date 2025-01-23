import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import LoanPage from "../LoanPage.tsx";

describe("LoanPage", () => {
  it("renders correctly", async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <LoanPage />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
