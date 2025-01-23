import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import CreditOffer from "@/components/CreditCardPage/GetCard/CreditOffers/CreditOffer.tsx";
import { CreditOfferType } from "@/components/types.ts";
import * as Requests from "@/rest/requests.ts";
import { AxiosResponse } from "axios";

const mockOffer: CreditOfferType = {
  applicationId: 1,
  totalAmount: 10000,
  requestedAmount: 10000,
  term: 5,
  rate: 5,
  monthlyPayment: 1000,
  isInsuranceEnabled: true,
  isSalaryClient: true,
};

describe("CreditOffer", () => {
  it("Выбор предложения", async () => {
    render(
      <Provider store={store}>
        <CreditOffer {...mockOffer} />
      </Provider>,
    );
    const spy = vi
      .spyOn(Requests, "selectOffer")
      .mockResolvedValue({ status: 200 } as AxiosResponse);
    const button = screen.queryByTestId("chooseOffer");
    if (button) {
      fireEvent.click(button);
    }
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(mockOffer);
    });
  });
});
