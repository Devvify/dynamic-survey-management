export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "radio"
  | "select"
  | "checkbox";

export type OptionForm = {
  id: string;
  label: string;
  value: string;
};

export type FieldForm = {
  id: string;
  key: string;
  label: string;
  type: FieldType;
  is_required: boolean;
  options?: OptionForm[];
};

export type FormValues = {
  title: string;
  description: string;
  status: "active" | "draft";
  fields: FieldForm[];
};
