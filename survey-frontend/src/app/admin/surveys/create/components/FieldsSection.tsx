import { FieldArray, ErrorMessage } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FieldItem } from "./FieldItem";
import { makeField } from "../utils";
import { FieldForm, FieldType, FormValues, OptionForm } from "../types";

type FieldsSectionProps = {
  fields: FieldForm[];
  values: FormValues;
  onFieldChange: (path: string, value: string | boolean | OptionForm[] | undefined) => void;
};

const FIELD_TYPES: Array<[FieldType, string]> = [
  ["text", "Text"],
  ["textarea", "Textarea"],
  ["number", "Number"],
  ["date", "Date"],
  ["radio", "Radio"],
  ["select", "Select"],
  ["checkbox", "Checkbox"],
];

export function FieldsSection({
  fields,
  values,
  onFieldChange,
}: FieldsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Fields</CardTitle>
        <Badge variant="secondary">{fields.length}</Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <FieldArray name="fields">
          {(arrayHelpers) => (
            <>
              {/* Add Field Buttons */}
              <div className="flex flex-wrap gap-2">
                {FIELD_TYPES.map(([type, label]) => (
                  <Button
                    key={type}
                    type="button"
                    variant="outline"
                    onClick={() =>
                      arrayHelpers.push(makeField(type, fields.length))
                    }
                  >
                    + {label}
                  </Button>
                ))}
              </div>

              <Separator />

              <ErrorMessage
                name="fields"
                component="p"
                className="text-sm text-red-600"
              />

              {fields.map((field, idx) => (
                <FieldItem
                  key={field.id}
                  field={field}
                  index={idx}
                  totalFields={fields.length}
                  values={values}
                  onMove={arrayHelpers.swap}
                  onRemove={arrayHelpers.remove}
                  onFieldChange={onFieldChange}
                />
              ))}
            </>
          )}
        </FieldArray>
      </CardContent>
    </Card>
  );
}
