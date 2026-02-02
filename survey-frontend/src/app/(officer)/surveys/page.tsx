"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/DataTable";
import { PAGE_ROUTES } from "@/lib/constants/routes";
import { useOfficerSurveys } from "@/lib/hooks/useSurveys";
import type { Survey } from "@/lib/api";

export default function OfficerSurveysPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, error } = useOfficerSurveys({
    page: currentPage,
    per_page: perPage,
  });

  const surveys = Array.isArray(data) ? data : data?.data || [];
  const pagination = Array.isArray(data)
    ? undefined
    : {
        current_page: data?.current_page || 1,
        last_page: data?.last_page || 1,
        total: data?.total || 0,
      };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString();
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
      header: "Title",
      accessorKey: "title",
      className: "font-medium",
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ value }: { value: string | null | undefined }) => (
        <span className="text-sm text-muted-foreground line-clamp-2">
          {value || "-"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: ({ row }: { row: Survey }) => (
        <Badge 
          variant={
            row.status === "active" 
              ? "default" 
              : row.status === "draft" 
                ? "secondary" 
                : "outline"
          }
          className="capitalize"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "created_at",
      cell: ({ value }: { value: string | undefined }) =>
        value
          ? formatDate(value)
          : "-",
      className: "text-sm text-muted-foreground",
    },
    {
      header: "Actions",
      cell: ({ row }: { row: Survey }) => (
        <div className="flex justify-end">
          <Button size="sm" variant="outline" asChild>
            <Link href={PAGE_ROUTES.OFFICER.SURVEYS.DETAIL(row.id)}>
              Take Survey
            </Link>
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Available Surveys</h1>
      </div>

      <DataTable
        columns={columns}
        data={surveys}
        loading={isLoading}
        error={error?.message || null}
        emptyMessage="No surveys available."
        pagination={
          pagination
            ? {
                currentPage: pagination.current_page,
                lastPage: pagination.last_page,
                total: pagination.total,
                perPage,
                onPageChange: setCurrentPage,
                onPerPageChange: handlePerPageChange,
              }
            : undefined
        }
        getRowKey={(survey) => survey.id}
      />
    </div>
  );
}
