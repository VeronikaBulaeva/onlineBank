import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CreditOfferType } from "@/components/types.ts";
import { RootState } from "@/app/store/types.ts";

export interface CreditSliceState {
  creditOffers: CreditOfferType[] | null;
  applicationId: number[];
  applicationIdsStep: Record<string, number>;
}

const initialState: CreditSliceState = {
  creditOffers: [],
  applicationId: [],
  applicationIdsStep: {},
};

export const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    setCreditOffers: (
      state,
      action: PayloadAction<CreditOfferType[] | null>,
    ) => {
      state.creditOffers = action.payload;
    },
    setApplicationId: (state, action: PayloadAction<number>) => {
      state.applicationId.push(action.payload);
    },
    removeApplicationId: (state, action: PayloadAction<number>) => {
      state.applicationId = state.applicationId.filter(
        (id) => id !== action.payload,
      );
      delete state.applicationIdsStep[action.payload];
    },
    setAppIdStep: (
      state,
      action: PayloadAction<{ id: string; step: number }>,
    ) => {
      state.applicationIdsStep[action.payload.id] = action.payload.step;
    },
  },
});

export const {
  setCreditOffers,
  setApplicationId,
  removeApplicationId,
  setAppIdStep,
} = creditSlice.actions;

export const creditOffersSelector = (state: RootState) =>
  state.credit.creditOffers;

export const applicationIdsSelector = (state: RootState) =>
  state.credit.applicationId;

export const appIdStepSelector = (state: RootState) =>
  state.credit.applicationIdsStep;

export default creditSlice.reducer;
