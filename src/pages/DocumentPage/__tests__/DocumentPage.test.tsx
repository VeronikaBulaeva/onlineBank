import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import DocumentPage from "../DocumentPage.tsx";
import * as Requests from "@/rest/requests.ts";
import { AxiosResponse } from "axios";
import { CreditInfo } from "@/components/types.ts";

const mockedData = {
  data: {
    credit: {
      paymentSchedule: [
        {
          number: 0,
          date: "11.10.2015",
          debtPayment: 100000,
          interestPayment: 10000,
          remainingDebt: 2000000,
          totalPayment: 30000000,
        },
        {
          number: 1,
          date: "11.11.2015",
          debtPayment: 10000,
          interestPayment: 1000,
          remainingDebt: 200000,
          totalPayment: 30000000,
        },
      ],
    },
  },
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: "1" }),
  };
});

describe("DocumentPage", () => {
  it("Отображение платежного графика", async () => {
    const spy = vi
      .spyOn(Requests, "getCreditDataById")
      .mockResolvedValue(mockedData as AxiosResponse<CreditInfo>);
    render(
      <Provider store={store}>
        <Router>
          <DocumentPage />
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith("1");
    });
  });

  it("Отказ от заявки", async () => {
    vi.spyOn(Requests, "createDocument").mockResolvedValue({
      status: 200,
    } as AxiosResponse);
    render(
      <Provider store={store}>
        <Router>
          <DocumentPage />
        </Router>
      </Provider>,
    );
    const deny = screen.getByTestId("deny");
    fireEvent.click(deny);
    const denyModal = screen.queryByText("Deny application");
    await waitFor(() => {
      expect(denyModal).toBeInTheDocument();
    });
    const approveDeny = screen.getByTestId("approveDeny");
    fireEvent.click(approveDeny);
    await waitFor(() => {
      expect(denyModal).not.toBeInTheDocument();
    });
  });

  it("Принятие заявки", async () => {
    const spy = vi
      .spyOn(Requests, "getCreditDataById")
      .mockResolvedValue(mockedData as AxiosResponse<CreditInfo>);
    render(
      <Provider store={store}>
        <Router>
          <DocumentPage />
        </Router>
      </Provider>,
    );
    const send = screen.getByTestId("send");
    const agree = screen.getByTestId("agree");
    fireEvent.click(agree);
    fireEvent.click(send);
    await waitFor(() => {
      const success = screen.queryByText("Documents are formed");
      expect(success).toBeInTheDocument();
      expect(spy).toHaveBeenCalledWith("1");
    });
  });
});
