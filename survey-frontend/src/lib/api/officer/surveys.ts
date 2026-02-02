import { apiFetch } from "../client";
import { API_ROUTES } from "../../constants/routes";
import { Survey, SurveyDetail, PaginatedResponse, PaginationParams } from "../types";

export const officerSurveysApi = {
  list: async (params: PaginationParams) => {
    return apiFetch<PaginatedResponse<Survey>>(
      `${API_ROUTES.OFFICER.SURVEYS.LIST}?page=${params.page}&per_page=${params.per_page}`,
    );
  },

  getById: async (id: string | number) => {
    return apiFetch<{ data: SurveyDetail }>(API_ROUTES.OFFICER.SURVEYS.DETAIL(id));
  },
};
