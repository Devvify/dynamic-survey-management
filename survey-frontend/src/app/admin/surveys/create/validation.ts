import * as Yup from "yup";
import { FieldType } from "./types";

const optionSchema = Yup.object({
  id: Yup.string().required(),
  label: Yup.string().trim().required("Option label is required"),
  value: Yup.string()
    .trim()
    .matches(/^[a-z0-9_]+$/, "Use snake_case (a-z, 0-9, _)")
    .required("Option value is required"),
});

const fieldSchema = Yup.object({
  id: Yup.string().required(),
  key: Yup.string()
    .trim()
    .matches(/^[a-z0-9_]+$/, "Use snake_case (a-z, 0-9, _)")
    .required("Key is required"),
  label: Yup.string().trim().required("Label is required"),
  type: Yup.mixed<FieldType>()
    .oneOf([
      "text",
      "textarea",
      "number",
      "date",
      "radio",
      "select",
      "checkbox",
    ])
    .required(),
  is_required: Yup.boolean().required(),
  options: Yup.array().when("type", {
    is: (t: FieldType) => ["radio", "select", "checkbox"].includes(t),
    then: (s) =>
      s.of(optionSchema).min(1, "At least 1 option is required").required(),
    otherwise: (s) => s.notRequired().strip(),
  }),
});

export const surveySchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().nullable(),
  status: Yup.mixed<"active" | "draft">().oneOf(["active", "draft"]).required(),
  fields: Yup.array()
    .of(fieldSchema)
    .min(1, "Add at least one field")
    .test("unique-keys", "Field keys must be unique", (fields) => {
      if (!fields) return true;
      const keys = fields.map((f) => (f?.key || "").trim()).filter(Boolean);
      return new Set(keys).size === keys.length;
    })
    .required(),
});
