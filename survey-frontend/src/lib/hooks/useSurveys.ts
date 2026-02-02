import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminSurveysApi, officerSurveysApi, CreateSurveyData } from "@/lib/api";
import type { PaginationParams } from "@/lib/api/types";

export const surveyKeys = {
  all: ["surveys"] as const,
  admin: {
    all: () => [...surveyKeys.all, "admin"] as const,
    lists: () => [...surveyKeys.admin.all(), "list"] as const,
    list: (params: PaginationParams) => [...surveyKeys.admin.lists(), params] as const,
    details: () => [...surveyKeys.admin.all(), "detail"] as const,
    detail: (id: string | number) => [...surveyKeys.admin.details(), id] as const,
  },
  officer: {
    all: () => [...surveyKeys.all, "officer"] as const,
    lists: () => [...surveyKeys.officer.all(), "list"] as const,
    list: (params: PaginationParams) => [...surveyKeys.officer.lists(), params] as const,
    details: () => [...surveyKeys.officer.all(), "detail"] as const,
    detail: (id: string | number) => [...surveyKeys.officer.details(), id] as const,
  },
};

// Admin Hooks
export function useAdminSurveys(params: PaginationParams) {
  return useQuery({
    queryKey: surveyKeys.admin.list(params),
    queryFn: () => adminSurveysApi.list(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useAdminSurvey(id: string | number) {
  return useQuery({
    queryKey: surveyKeys.admin.detail(id),
    queryFn: () => adminSurveysApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSurveyData) => adminSurveysApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: surveyKeys.admin.lists() });
    },
  });
}

// Officer Hooks
export function useOfficerSurveys(params: PaginationParams) {
  return useQuery({
    queryKey: surveyKeys.officer.list(params),
    queryFn: () => officerSurveysApi.list(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useOfficerSurvey(id: string | number) {
  return useQuery({
    queryKey: surveyKeys.officer.detail(id),
    queryFn: () => officerSurveysApi.getById(id),
    enabled: !!id,
  });
}
