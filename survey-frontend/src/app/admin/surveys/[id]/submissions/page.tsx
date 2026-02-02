"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { PAGE_ROUTES } from "@/lib/constants/routes";
import { useAdminSurvey } from "@/lib/hooks/useSurveys";
import {
  useAdminSubmissions,
  useAdminSubmission,
} from "@/lib/hooks/useSubmissions";
import { Submission, SubmissionAnswer } from "@/lib/api";

export default function AdminSurveySubmissionsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: survey,
    isLoading: surveyLoading,
    error: surveyError,
  } = useAdminSurvey(id!);

  const {
    data: submissionsData,
    isLoading: submissionsLoading,
    error: submissionsError,
  } = useAdminSubmissions(id!, {
    page: currentPage,
    per_page: perPage,
  });

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<
    number | null
  >(null);
  const { data: submissionDetail, isLoading: loadingDetails } =
    useAdminSubmission(selectedSubmissionId!);

  const submissions = Array.isArray(submissionsData)
    ? submissionsData
    : submissionsData?.data || [];
  const pagination = Array.isArray(submissionsData)
    ? { current_page: 1, last_page: 1, total: submissions.length }
    : {
        current_page: submissionsData?.current_page || 1,
        last_page: submissionsData?.last_page || 1,
        total: submissionsData?.total || 0,
      };

  const handleSelectSubmission = (submission: Submission) => {
    setSelectedSubmissionId(submission.id);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      className: "font-mono text-sm",
    },
    {
      header: "Submitted By",
      accessorKey: "submitter.name",
      className: "font-medium",
    },
    {
      header: "Email",
      accessorKey: "submitter.email",
      className: "text-sm text-muted-foreground",
    },
    {
      header: "Submitted At",
      accessorKey: "created_at",
      cell: ({ value }: { value: string }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(value)}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: { row: Submission }) => (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleSelectSubmission(row)}
          >
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  const renderAnswerValue = (answer: SubmissionAnswer) => {
    const value = answer.value_json || answer.value_text;

    if (!value) return "No answer";

    // Handle JSON values (arrays for checkbox, objects, etc.)
    if (answer.value_json) {
      if (Array.isArray(answer.value_json)) {
        // For checkboxes, map values to labels if options exist
        if (answer.field.options && answer.field.options.length > 0) {
          return answer.value_json
            .map((val: string) => {
              const option = answer.field.options?.find(
                (opt) => opt.value === val,
              );
              return option ? option.label : val;
            })
            .join(", ");
        }
        return answer.value_json.join(", ");
      }
      return JSON.stringify(answer.value_json);
    }

    if (answer.field.options && answer.field.options.length > 0) {
      const option = answer.field.options?.find((opt) => opt.value === value);
      return option ? option.label : value;
    }

    return value || "-";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Survey Submissions</h1>
          {surveyLoading ? (
            <p className="text-sm text-muted-foreground">Loading survey...</p>
          ) : surveyError ? (
            <p className="text-sm text-red-600">Failed to load survey</p>
          ) : survey ? (
            <p className="text-sm text-muted-foreground">{survey.data.title}</p>
          ) : null}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(PAGE_ROUTES.ADMIN.SURVEYS.LIST)}
          >
            Back to Surveys
          </Button>
          {id && (
            <Button
              variant="outline"
              onClick={() => router.push(PAGE_ROUTES.ADMIN.SURVEYS.DETAIL(id))}
            >
              View Survey
            </Button>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={submissions}
        loading={submissionsLoading}
        error={submissionsError?.message || null}
        emptyMessage="No submissions yet."
        pagination={{
          currentPage: pagination.current_page,
          lastPage: pagination.last_page,
          total: pagination.total,
          perPage,
          onPageChange: setCurrentPage,
          onPerPageChange: handlePerPageChange,
        }}
        getRowKey={(submission) => submission.id}
      />

      {/* Selected Submission Details */}
      {selectedSubmissionId && (
        <Card className="mt-4">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Submission #{selectedSubmissionId} - Details
            </h3>
            {loadingDetails ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Loading details...
              </p>
            ) : submissionDetail ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Submitted By</p>
                    <p className="font-medium">
                      {submissionDetail.submitter.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {submissionDetail.submitter.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted At</p>
                    <p className="font-medium">
                      {formatDate(submissionDetail.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Answers</p>
                    <p className="font-medium">
                      {submissionDetail.answers?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-3">Answers</h4>
                  <div className="space-y-3">
                    {!submissionDetail.answers ||
                    submissionDetail.answers.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No answers found
                      </p>
                    ) : (
                      submissionDetail.answers.map((answer, idx) => (
                        <div
                          key={idx}
                          className="rounded-md border p-3 space-y-1"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                {answer.field.label}
                              </p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {answer.field.key}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {answer.field.type}
                            </Badge>
                          </div>
                          <div className="mt-2 pt-2 border-t">
                            <p className="text-sm">
                              {renderAnswerValue(answer)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
