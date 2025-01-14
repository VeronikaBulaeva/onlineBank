import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { applicationIdsSelector } from "@/app/store/slices/creditSlice.ts";
import { useEffect } from "react";
import { NOT_FOUND_PAGE_ROUTE } from "@/constants/routes.ts";

const useCompareIds = (id?: string) => {
  const applicationIds = useSelector(applicationIdsSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      if (!applicationIds.includes(+id)) {
        navigate(NOT_FOUND_PAGE_ROUTE);
      }
    }
  }, [id, applicationIds]);
};

export default useCompareIds;
