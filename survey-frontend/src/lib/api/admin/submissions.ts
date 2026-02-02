import { apiFetch } from "../client";
import { API_ROUTES } from "../../constants/routes";
import { Submission, PaginatedResponse, PaginationParams } from "../types";

export const adminSubmissionsApi = {
  listBySurvey: async (surveyId: string | number, params: PaginationParams) => {
    return apiFetch<PaginatedResponse<Submission>>(
      `${API_ROUTES.ADMIN.SURVEYS.SUBMISSIONS(surveyId)}?page=${params.page}&per_page=${params.per_page}`,
    );
  },

  getById: async (id: string | number) => {
    return apiFetch<Submission>(API_ROUTES.ADMIN.SUBMISSIONS.DETAIL(id));
  },
};
