import { v4 as uuid } from "uuid";
import type { FieldType, FieldForm } from "../types";

// Simple snake_case generator
export function toSnakeCase(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

// Create a new field with default values
export function makeField(type: FieldType, index: number): FieldForm {
  const base: FieldForm = {
    id: uuid(),
    key: `field_${index + 1}`,
    label: `Question ${index + 1}`,
    type,
    is_required: false,
  };

  if (["radio", "select", "checkbox"].includes(type)) {
    base.options = [{ id: uuid(), label: "Option 1", value: "option_1" }];
  }

  return base;
}
