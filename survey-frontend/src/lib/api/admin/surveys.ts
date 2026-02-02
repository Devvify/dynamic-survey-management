import { apiFetch } from "../client";
import { API_ROUTES } from "../../constants/routes";
import {
  Survey,
  SurveyDetail,
  CreateSurveyData,
  PaginatedResponse,
  PaginationParams,
} from "../types";

export const adminSurveysApi = {
  list: async (params: PaginationParams) => {
    return apiFetch<PaginatedResponse<Survey>>(
      `${API_ROUTES.ADMIN.SURVEYS.LIST}?page=${params.page}&per_page=${params.per_page}`,
    );
  },

  create: async (data: CreateSurveyData) => {
    return apiFetch<Survey>(API_ROUTES.ADMIN.SURVEYS.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getById: async (id: string | number) => {
    return apiFetch<{ data: SurveyDetail }>(API_ROUTES.ADMIN.SURVEYS.DETAIL(id));
  },
};
