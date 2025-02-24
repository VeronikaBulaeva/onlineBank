import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../NotFoundPage.tsx";

describe("LoanPage", () => {
  it("renders correctly", async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <NotFoundPage />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
