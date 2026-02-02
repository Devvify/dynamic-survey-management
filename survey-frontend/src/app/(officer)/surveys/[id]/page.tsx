"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useOfficerSurvey } from "@/lib/hooks/useSurveys";
import { useSubmitSurvey } from "@/lib/hooks/useSubmissions";
import { PAGE_ROUTES } from "@/lib/constants/routes";
import { Field } from "@/lib/api/types";

export default function OfficerSurveyFillPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const {
    data: survey,
    isLoading: surveyLoading,
    error: surveyError,
  } = useOfficerSurvey(id!);
    console.log("🚀 ~ OfficerSurveyFillPage ~ survey:", survey);
  const submitSurvey = useSubmitSurvey(id!);

  console.log('Survey Data:', { survey, surveyLoading, surveyError });

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (fieldKey: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleCheckboxChange = (
    fieldKey: string,
    optionValue: string,
    checked: boolean,
  ) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[fieldKey]) ? prev[fieldKey] : [];
      if (checked) {
        return { ...prev, [fieldKey]: [...current, optionValue] };
      } else {
        return {
          ...prev,
          [fieldKey]: current.filter((v: string) => v !== optionValue),
        };
      }
    });
  };

  const validateForm = () => {
    if (!survey?.data?.fields) return false;

    for (const field of survey.data.fields) {
      if (field.is_required) {
        const value = answers[field.key];
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setError(null);
      await submitSurvey.mutateAsync(answers);
      setSuccess(true);
      setTimeout(() => {
        router.push(PAGE_ROUTES.OFFICER.SURVEYS.LIST);
      }, 2000);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to submit survey";
      setError(errorMessage);
    }
  };

  const renderField = (field: Field) => {
    const fieldValue = answers[field.key];

    switch (field.type) {
      case "text":
      case "number":
      case "date":
        return (
          <Input
            type={field.type}
            value={typeof fieldValue === 'string' ? fieldValue : ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            required={field.is_required}
          />
        );

      case "textarea":
        return (
          <Textarea
            value={typeof fieldValue === 'string' ? fieldValue : ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            required={field.is_required}
            rows={4}
          />
        );

      case "select":
        return (
          <select
            className="w-full h-10 rounded-md border px-3"
            value={typeof fieldValue === 'string' ? fieldValue : ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            required={field.is_required}
          >
            <option value="">Select an option</option>
            {(field.options || [])
              .sort((a, b) => a.order - b.order)
              .map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
          </select>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {(field.options || [])
              .sort((a, b) => a.order - b.order)
              .map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`${field.key}-${opt.value}`}
                    name={field.key}
                    value={opt.value}
                    checked={typeof fieldValue === 'string' && fieldValue === opt.value}
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                    required={field.is_required}
                  />
                  <label
                    htmlFor={`${field.key}-${opt.value}`}
                    className="text-sm"
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {(field.options || [])
              .sort((a, b) => a.order - b.order)
              .map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`${field.key}-${opt.value}`}
                    value={opt.value}
                    checked={
                      Array.isArray(fieldValue) &&
                      fieldValue.includes(opt.value)
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        field.key,
                        opt.value,
                        e.target.checked,
                      )
                    }
                  />
                  <label
                    htmlFor={`${field.key}-${opt.value}`}
                    className="text-sm"
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
          </div>
        );

      default:
        return <Input value={typeof fieldValue === 'string' ? fieldValue : ""} disabled />;
    }
  };

  if (surveyLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Loading survey...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (surveyError || (!surveyLoading && !survey)) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-red-600">
              {surveyError?.message || error || "Failed to load survey"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Survey Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you for completing the survey. Redirecting...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!survey) return null;

  const sortedFields = survey.data?.fields ? [...survey.data.fields].sort((a, b) => a.order - b.order) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(PAGE_ROUTES.OFFICER.SURVEYS.LIST)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Survey Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{survey.data.title}</CardTitle>
              {survey.data.description && (
                <p className="text-sm text-muted-foreground">
                  {survey.data.description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-sm text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {sortedFields.map((field) => (
          <Card key={field.key}>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-2">
                <Label className="text-base font-medium">
                  {field.label}
                  {field.is_required && (
                    <span className="text-red-600 ml-1">*</span>
                  )}
                </Label>
              </div>
              <div className="text-xs text-muted-foreground font-mono mb-2">
                {field.key}
              </div>
              {renderField(field)}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(PAGE_ROUTES.OFFICER.SURVEYS.LIST)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitSurvey.isPending}>
            {submitSurvey.isPending ? "Submitting..." : "Submit Survey"}
          </Button>
        </div>
      </form>
    </div>
  );
}
