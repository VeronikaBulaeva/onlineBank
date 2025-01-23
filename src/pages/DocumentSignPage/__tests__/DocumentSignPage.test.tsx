import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import DocumentSignPage from "../DocumentSignPage.tsx";
import * as Requests from "@/rest/requests.ts";
import { AxiosResponse } from "axios";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: "1" }),
  };
});

describe("DocumentSignPage", () => {
  it("Подписание документа", async () => {
    const spy = vi
      .spyOn(Requests, "signDocument")
      .mockResolvedValue({ status: 200 } as AxiosResponse);
    render(
      <Provider store={store}>
        <Router>
          <DocumentSignPage />
        </Router>
      </Provider>,
    );
    const agree = screen.getByTestId("agree");
    const send = screen.getByTestId("send");
    fireEvent.click(agree);
    fireEvent.click(send);
    await waitFor(() => {
      const success = screen.queryByText(
        "Documents have been successfully signed and sent for approval",
      );
      expect(success).toBeInTheDocument();
      expect(spy).toHaveBeenCalledWith("1");
    });
  });
});
