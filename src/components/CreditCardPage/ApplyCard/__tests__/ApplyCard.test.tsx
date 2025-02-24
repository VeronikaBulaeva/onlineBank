import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ApplyCard from "@/components/CreditCardPage/ApplyCard/ApplyCard.tsx";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import { CreditOfferType } from "@/components/types.ts";
import { CreditSliceState } from "@/app/store/slices/creditSlice.ts";
import { Store } from "@reduxjs/toolkit";

describe("ApplyCard", () => {
  it("Отрисовка компонента без предложений", async () => {
    render(
      <Provider store={store}>
        <ApplyCard />
      </Provider>,
    );
    const text = screen.queryByText("Apply for card");
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });

  it("Отрисовка компонента с предложениями", async () => {
    const mockStore = {
      ...store,
      credit: {
        creditOffers: [{ applicationId: 1 } as CreditOfferType],
      } as CreditSliceState,
    };
    const mockScroll = vi.fn();
    vi.spyOn(global.document, "getElementById").mockImplementation(
      () => ({ scrollIntoView: mockScroll }) as unknown as HTMLElement,
    );
    render(
      <Provider store={{ ...store, getState: () => mockStore } as Store}>
        <ApplyCard />
      </Provider>,
    );
    const text = screen.queryByText("Choose an offer");
    const button = screen.getByTestId("applyCard");
    fireEvent.click(button);
    expect(mockScroll).toHaveBeenCalledWith({ behavior: "smooth" });
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });

  it("Отрисовка компонента с выбранным предложением", async () => {
    const mockStore = {
      ...store,
      credit: {
        creditOffers: null,
      } as CreditSliceState,
    };
    render(
      <Provider store={{ ...store, getState: () => mockStore } as Store}>
        <ApplyCard />
      </Provider>,
    );
    const text = screen.queryByText("Continue registration");
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });
});
