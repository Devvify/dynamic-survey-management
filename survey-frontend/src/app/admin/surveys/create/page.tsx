"use client";

import { Formik, Form, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SurveyInfoSection } from "./components/SurveyInfoSection";
import { FieldsSection } from "./components/FieldsSection";
import { surveySchema } from "./validation";
import { FormValues } from "./types";
import { PAGE_ROUTES } from "@/lib/constants/routes";
import { useCreateSurvey } from "@/lib/hooks/useSurveys";

export default function CreateSurveyPage() {
  const router = useRouter();
  const createSurvey = useCreateSurvey();

  const initialValues: FormValues = {
    title: "",
    description: "",
    status: "active",
    fields: [],
  };

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      const payload = {
        title: values.title,
        description: values.description || null,
        status: values.status,
        fields: values.fields.map((f, idx) => ({
          key: f.key,
          label: f.label,
          type: f.type,
          is_required: f.is_required,
          order: idx + 1,
          ...(f.options
            ? {
                options: f.options.map((o, oidx) => ({
                  label: o.label,
                  value: o.value,
                  order: oidx + 1,
                })),
              }
            : {}),
        })),
      };

      await createSurvey.mutateAsync(payload);
      router.replace(PAGE_ROUTES.ADMIN.SURVEYS.LIST);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to create survey";
      actions.setStatus(errorMessage);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Create Survey</h1>
          <p className="text-sm text-muted-foreground">
            Build survey fields exactly like your backend expects.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => router.push(PAGE_ROUTES.ADMIN.SURVEYS.LIST)}
        >
          Back
        </Button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={surveySchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, status }) => (
          <Form className="space-y-4">
            {status && <p className="text-sm text-red-600">{status}</p>}

            <SurveyInfoSection
              status={values.status}
              onStatusChange={(status) => setFieldValue("status", status)}
            />

            <FieldsSection
              fields={values.fields}
              values={values}
              onFieldChange={setFieldValue}
            />

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Survey"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
