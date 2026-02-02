import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminSubmissionsApi } from "@/lib/api";
import { apiFetch } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/constants/routes";
import type { PaginationParams } from "@/lib/api/types";
import { surveyKeys } from "./useSurveys";

// Query Keys
export const submissionKeys = {
  all: ["submissions"] as const,
  admin: {
    all: () => [...submissionKeys.all, "admin"] as const,
    bySurvey: (surveyId: string | number) =>
      [...submissionKeys.admin.all(), "survey", surveyId] as const,
    bySurveyList: (surveyId: string | number, params: PaginationParams) =>
      [...submissionKeys.admin.bySurvey(surveyId), params] as const,
    details: () => [...submissionKeys.admin.all(), "detail"] as const,
    detail: (id: string | number) =>
      [...submissionKeys.admin.details(), id] as const,
  },
  officer: {
    all: () => [...submissionKeys.all, "officer"] as const,
    bySurvey: (surveyId: string | number) =>
      [...submissionKeys.officer.all(), "survey", surveyId] as const,
  },
};

// Admin Hooks
export function useAdminSubmissions(
  surveyId: string | number,
  params: PaginationParams,
) {
  return useQuery({
    queryKey: submissionKeys.admin.bySurveyList(surveyId, params),
    queryFn: () => adminSubmissionsApi.listBySurvey(surveyId, params),
    enabled: !!surveyId,
    placeholderData: (previousData) => previousData,
  });
}

export function useAdminSubmission(id: string | number) {
  return useQuery({
    queryKey: submissionKeys.admin.detail(id),
    queryFn: () => adminSubmissionsApi.getById(id),
    enabled: !!id,
  });
}

// Officer Hooks
export function useOfficerSubmission(surveyId: string | number) {
  return useQuery({
    queryKey: submissionKeys.officer.bySurvey(surveyId),
    queryFn: () => apiFetch(API_ROUTES.OFFICER.SURVEYS.SUBMISSION(surveyId)),
    enabled: !!surveyId,
    retry: false,
  });
}

export function useSubmitSurvey(surveyId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answers: Record<string, string | string[]>) =>
      apiFetch(API_ROUTES.OFFICER.SURVEYS.SUBMIT(surveyId), {
        method: "POST",
        body: JSON.stringify({ answers }),
      }),
    onSuccess: () => {
      // Invalidate the submission query for this survey
      queryClient.invalidateQueries({
        queryKey: submissionKeys.officer.bySurvey(surveyId),
      });
      // Invalidate the officer surveys list (to update completion status)
      queryClient.invalidateQueries({ queryKey: surveyKeys.officer.lists() });
    },
  });
}
