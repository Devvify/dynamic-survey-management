import { Field, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { FieldType, FieldForm, FormValues, OptionForm } from "../types";
import { toSnakeCase } from "../utils";

type FieldItemProps = {
  field: FieldForm;
  index: number;
  totalFields: number;
  values: FormValues;
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  onFieldChange: (path: string, value: string | boolean | OptionForm[] | undefined) => void;
};

export function FieldItem({
  field,
  index,
  totalFields,
  values,
  onMove,
  onRemove,
  onFieldChange,
}: FieldItemProps) {
  const hasOptions = ["radio", "select", "checkbox"].includes(field.type);

  return (
    <Card className="border">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Field #{index + 1}{" "}
                <span className="text-xs text-muted-foreground">
                  (order: {index + 1})
                </span>
              </p>

              <div className="flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => index > 0 && onMove(index, index - 1)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    index < totalFields - 1 && onMove(index, index + 1)
                  }
                  disabled={index === totalFields - 1}
                >
                  ↓
                </Button>
              </div>
            </div>

            {/* Label */}
            <div className="grid gap-1">
              <label className="text-sm font-medium">Label</label>
              <Field name={`fields.${index}.label`}>
                {({ field: formikField }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent) => void; onBlur: (e: React.FocusEvent) => void } }) => (
                  <Input
                    {...formikField}
                    onBlur={(e) => {
                      formikField.onBlur(e);
                      const currentKey = values.fields[index]?.key || "";
                      const looksAuto =
                        currentKey.startsWith("field_") ||
                        currentKey.trim() === "";

                      if (looksAuto) {
                        const nextKey = toSnakeCase(e.target.value);
                        if (nextKey)
                          onFieldChange(`fields.${index}.key`, nextKey);
                      }
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name={`fields.${index}.label`}
                component="p"
                className="text-sm text-red-600"
              />
            </div>

            {/* Key + Type + Required */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="grid gap-1">
                <label className="text-sm font-medium">Key</label>
                <Field name={`fields.${index}.key`}>
                  {({ field: formikField }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent) => void; onBlur: (e: React.FocusEvent) => void } }) => (
                    <Input {...formikField} placeholder="employee_name" />
                  )}
                </Field>
                <ErrorMessage
                  name={`fields.${index}.key`}
                  component="p"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-medium">Type</label>
                <select
                  className="h-10 rounded-md border px-3"
                  value={field.type}
                  onChange={(e) => {
                    const nextType = e.target.value as FieldType;
                    onFieldChange(`fields.${index}.type`, nextType);

                    const needsOptions = [
                      "radio",
                      "select",
                      "checkbox",
                    ].includes(nextType);
                    if (
                      needsOptions &&
                      (!field.options || field.options.length === 0)
                    ) {
                      onFieldChange(`fields.${index}.options`, [
                        { id: uuid(), label: "Option 1", value: "option_1" },
                      ]);
                    }
                    if (!needsOptions) {
                      onFieldChange(`fields.${index}.options`, undefined);
                    }
                  }}
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="radio">Radio</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-medium">Required</label>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    checked={!!field.is_required}
                    onChange={(e) =>
                      onFieldChange(
                        `fields.${index}.is_required`,
                        e.target.checked,
                      )
                    }
                  />
                  <span className="text-sm">Yes</span>
                </div>
              </div>
            </div>

            {/* Options */}
            {hasOptions && (
              <OptionsSection
                field={field}
                fieldIndex={index}
                values={values}
                onFieldChange={onFieldChange}
              />
            )}
          </div>

          <Button
            type="button"
            variant="destructive"
            onClick={() => onRemove(index)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

type OptionsSectionProps = {
  field: FieldForm;
  fieldIndex: number;
  values: FormValues;
  onFieldChange: (path: string, value: string | OptionForm[] | undefined) => void;
};

function OptionsSection({
  field,
  fieldIndex,
  values,
  onFieldChange,
}: OptionsSectionProps) {
  const options = field.options ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Options</p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            onFieldChange(`fields.${fieldIndex}.options`, [
              ...options,
              {
                id: uuid(),
                label: `Option ${options.length + 1}`,
                value: `option_${options.length + 1}`,
              },
            ]);
          }}
        >
          + Add option
        </Button>
      </div>

      {options.map((opt: OptionForm, oidx: number) => (
        <div key={opt.id} className="grid grid-cols-1 gap-2 md:grid-cols-4">
          <div className="md:col-span-2 grid gap-1">
            <label className="text-xs text-muted-foreground">
              Label (order: {oidx + 1})
            </label>
            <Field name={`fields.${fieldIndex}.options.${oidx}.label`}>
              {({ field: formikField }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent) => void; onBlur: (e: React.FocusEvent) => void } }) => (
                <Input
                  {...formikField}
                  onBlur={(e) => {
                    formikField.onBlur(e);
                    const currentValue =
                      values.fields[fieldIndex]?.options?.[oidx]?.value || "";
                    const looksAuto =
                      currentValue.startsWith("option_") ||
                      currentValue.trim() === "";

                    if (looksAuto) {
                      const nextVal = toSnakeCase(e.target.value);
                      if (nextVal)
                        onFieldChange(
                          `fields.${fieldIndex}.options.${oidx}.value`,
                          nextVal,
                        );
                    }
                  }}
                />
              )}
            </Field>
          </div>

          <div className="grid gap-1">
            <label className="text-xs text-muted-foreground">Value</label>
            <Field name={`fields.${fieldIndex}.options.${oidx}.value`}>
              {({ field: formikField }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent) => void; onBlur: (e: React.FocusEvent) => void } }) => (
                <Input {...formikField} placeholder="remote" />
              )}
            </Field>
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => {
                const next = options.filter((_: OptionForm, i: number) => i !== oidx);
                onFieldChange(`fields.${fieldIndex}.options`, next);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <ErrorMessage
        name={`fields.${fieldIndex}.options`}
        component="p"
        className="text-sm text-red-600"
      />
    </div>
  );
}
