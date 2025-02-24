import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CodeConfirmation from "../CodeConfirmation.tsx";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as Requests from "@/rest/requests.ts";
import { AxiosResponse } from "axios";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: "1" }),
  };
});

describe("CodeConfirmation", () => {
  it("успешная отправка кода подтверждения", async () => {
    render(
      <Provider store={store}>
        <Router>
          <CodeConfirmation />
        </Router>
      </Provider>,
    );
    const spy = vi
      .spyOn(Requests, "sendSignCode")
      .mockResolvedValue({ status: 200 } as AxiosResponse);
    const input = screen.queryByTestId("codeInput");
    expect(input).toHaveFocus();

    if (input) {
      await userEvent.type(input, "1234");
    }
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith("1", "1234");
      const congratulations = screen.queryByTestId("congratulations");
      expect(congratulations).toBeInTheDocument();
    });
  });

  it("отправка кода с ошибкой", async () => {
    render(
      <Provider store={store}>
        <Router>
          <CodeConfirmation />
        </Router>
      </Provider>,
    );

    vi.spyOn(Requests, "sendSignCode").mockRejectedValue({
      status: 500,
    } as AxiosResponse);
    const input = screen.queryByTestId("codeInput");
    const clickText = screen.queryByTestId("clickText0");
    if (clickText) {
      fireEvent.click(clickText);
    }
    expect(input).toHaveFocus();

    if (input) {
      await userEvent.type(input, "1234");
    }
    await waitFor(() => {
      const error = screen.queryByText("Invalid confirmation code");
      expect(error).toBeInTheDocument();
    });
  });
});
