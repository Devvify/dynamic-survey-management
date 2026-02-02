import { Field, ErrorMessage } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SurveyInfoSectionProps = {
  status: "active" | "draft";
  onStatusChange: (status: "active" | "draft") => void;
};

export function SurveyInfoSection({
  status,
  onStatusChange,
}: SurveyInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-1">
          <label className="text-sm font-medium">Title</label>
          <Field name="title">
            {({ field }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent) => void; onBlur: (e: React.FocusEvent) => void } }) => (
              <Input {...field} placeholder="Employee Feedback Survey" />
            )}
          </Field>
          <ErrorMessage
            name="title"
            component="p"
            className="text-sm text-red-600"
          />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">Description</label>
          <Field name="description">
            {({ field }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent) => void; onBlur: (e: React.FocusEvent) => void } }) => (
              <Textarea {...field} placeholder="Monthly feedback collection" />
            )}
          </Field>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">Status</label>
          <select
            className="h-10 rounded-md border px-3"
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as "active" | "draft")
            }
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
