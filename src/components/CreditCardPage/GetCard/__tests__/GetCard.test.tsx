import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import GetCard from "../GetCard.tsx";
import { store } from "@/app/store/store.ts";
import { CreditSliceState } from "@/app/store/slices/creditSlice.ts";
import { Store } from "@reduxjs/toolkit";

describe("GetCard", () => {
  it("Отрисовка компонента в случае, когда нет предложений", async () => {
    render(
      <Provider store={store}>
        <GetCard />
      </Provider>,
    );
    const form = screen.getByTestId("customizeCardForm");
    expect(form).toBeInTheDocument();
  });

  it("Отрисовка компонента в случае, когда есть предложения", async () => {
    const mockStore = {
      ...store,
      credit: {
        creditOffers: [
          {
            applicationId: 1,
            totalAmount: 10000,
            requestedAmount: 10000,
            term: 5,
            rate: 5,
            monthlyPayment: 1000,
            isInsuranceEnabled: true,
            isSalaryClient: true,
          },
        ],
      } as CreditSliceState,
    };

    render(
      <Provider
        store={
          {
            ...store,
            getState: () => mockStore,
          } as Store
        }
      >
        <GetCard />
      </Provider>,
    );
    const offers = screen.getByTestId("offers");
    expect(offers).toBeInTheDocument();
  });

  it("Отрисовка компонента в случае, когда выбрали предложение", async () => {
    const mockStore = {
      ...store,
      credit: { creditOffers: null } as CreditSliceState,
    };

    render(
      <Provider
        store={
          {
            ...store,
            getState: () => mockStore,
          } as Store
        }
      >
        <GetCard />
      </Provider>,
    );
    const offers = screen.getByTestId("chosenOffer");
    expect(offers).toBeInTheDocument();
  });
});
