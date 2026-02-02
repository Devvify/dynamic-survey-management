"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/DataTable";
import { PAGE_ROUTES } from "@/lib/constants/routes";
import { useAdminSurveys } from "@/lib/hooks/useSurveys";
import type { Survey } from "@/lib/api";

export default function AdminSurveysPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, error } = useAdminSurveys({
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
      header: "Status",
      accessorKey: "status",
      cell: ({ value }: { value: string }) =>
        value ? (
          <Badge 
            variant={
              value === "active" 
                ? "default" 
                : value === "draft" 
                  ? "secondary" 
                  : "outline"
            }
            className="capitalize"
          >
            {value}
          </Badge>
        ) : null,
    },
    {
      header: "Created",
      accessorKey: "created_at",
      cell: ({ value }: { value: string }) =>
        value ? new Date(value).toLocaleDateString() : "-",
      className: "text-sm text-muted-foreground",
    },
    {
      header: "Actions",
      cell: ({ row }: { row: Survey }) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href={PAGE_ROUTES.ADMIN.SURVEYS.DETAIL(row.id)}>View</Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={PAGE_ROUTES.ADMIN.SURVEYS.SUBMISSIONS(row.id)}>
              Submissions
            </Link>
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Surveys</h1>
        <Button asChild>
          <Link href={PAGE_ROUTES.ADMIN.SURVEYS.CREATE}>Create Survey</Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={surveys}
        loading={isLoading}
        error={error?.message || null}
        emptyMessage="No surveys found."
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
