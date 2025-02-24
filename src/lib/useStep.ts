import { useSelector } from "react-redux";
import {
  appIdStepSelector,
  setAppIdStep,
} from "@/app/store/slices/creditSlice.ts";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks.ts";
import { useNavigate } from "react-router-dom";
import { NOT_FOUND_PAGE_ROUTE } from "@/constants/routes.ts";

const useStep = (step: number, id?: string) => {
  const appIdsStep = useSelector(appIdStepSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      if (step < appIdsStep[id] - 1 || step > appIdsStep[id] + 1) {
        navigate(NOT_FOUND_PAGE_ROUTE);
        return;
      }
      const currentStep = appIdsStep[id];
      if (currentStep < step) {
        dispatch(setAppIdStep({ id, step }));
      }
    }
  }, [id, step, appIdsStep]);
};

export default useStep;
