"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAdminSurvey } from "@/lib/hooks/useSurveys";

function TypeBadge({ type }: { type: string }) {
  return (
    <Badge variant="outline" className="uppercase">
      {type}
    </Badge>
  );
}

export default function AdminSurveyViewPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data: survey, isLoading: loading, error } = useAdminSurvey(id!);

  const fieldsSorted = useMemo(() => {
    if (!survey?.data?.fields) return [];
    return [...survey.data.fields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [survey]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Survey Details</h1>
          <p className="text-sm text-muted-foreground">
            View survey structure and questions.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/surveys")}
          >
            Back
          </Button>

          {id && (
            <Button variant="outline" asChild>
              <Link href={`/admin/surveys/${id}/submissions`}>Submissions</Link>
            </Button>
          )}
        </div>
      </div>

      {loading && (
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      )}

      {!loading && error && (
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-red-600">
              {error.message || "Failed to load survey"}
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && survey && (
        <>
          {/* Meta */}
          <Card>
            <CardHeader className="space-y-2">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-xl">{survey.data.title}</CardTitle>
                <Badge
                  variant={
                    survey.data.status === "active" 
                      ? "default" 
                      : survey.data.status === "draft" 
                        ? "secondary" 
                        : "outline"
                  }
                  className="capitalize"
                >
                  {survey.data.status}
                </Badge>
              </div>

              {survey.data.description && (
                <p className="text-sm text-muted-foreground">
                  {survey.data.description}
                </p>
              )}

              <div className="text-xs text-muted-foreground">
                ID: {survey.data.id}
              </div>
            </CardHeader>
          </Card>

          {/* Fields */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Fields</CardTitle>
              <Badge variant="secondary">{fieldsSorted.length}</Badge>
            </CardHeader>

            <CardContent className="space-y-3">
              {fieldsSorted.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No fields found.
                </p>
              ) : (
                fieldsSorted.map((f) => {
                  const optionsSorted = (f.options ?? [])
                    .slice()
                    .sort((a, b) => a.order - b.order);

                  return (
                    <div key={f.key} className="rounded-md border p-4">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium">
                              {f.order}. {f.label}
                            </p>
                            <TypeBadge type={f.type} />
                            {f.is_required ? (
                              <Badge variant="destructive">required</Badge>
                            ) : (
                              <Badge variant="secondary">optional</Badge>
                            )}
                          </div>

                          <p className="text-xs text-muted-foreground">
                            key: <span className="font-mono">{f.key}</span>
                          </p>
                        </div>
                      </div>

                      {optionsSorted.length > 0 && (
                        <>
                          <Separator className="my-3" />
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Options</p>

                            <div className="space-y-1">
                              {optionsSorted.map((o) => (
                                <div
                                  key={`${f.key}:${o.value}`}
                                  className="flex items-center justify-between rounded-md border px-3 py-2"
                                >
                                  <div>
                                    <p className="text-sm">
                                      {o.order}. {o.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      value:{" "}
                                      <span className="font-mono">
                                        {o.value}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
