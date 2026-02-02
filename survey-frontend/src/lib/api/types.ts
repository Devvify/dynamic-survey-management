export type PaginatedResponse<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
};

export type Survey = {
  id: number;
  title: string;
  description?: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
  submissions_count?: number;
  has_submitted?: boolean;
};

export type SurveyDetail = Survey & {
  fields: Field[];
};

export type FieldOption = {
  id?: number;
  field_id?: number;
  label: string;
  value: string;
  order: number;
};

export type Field = {
  id?: number;
  survey_id?: number;
  key: string;
  label: string;
  type: string;
  is_required: boolean;
  help_text?: string | null;
  order: number;
  options?: FieldOption[];
};

export type CreateSurveyData = {
  title: string;
  description?: string | null;
  status: string;
  fields: Field[];
};

export type Submitter = {
  id: number;
  name: string;
  email: string;
};

export type SubmissionAnswer = {
  id: number;
  submission_id: number;
  field_id: number;
  value_text: string | null;
  value_json: string | string[] | null;
  field: Field;
};

export type Submission = {
  id: number;
  survey_id: number;
  submitted_by: number;
  created_at: string;
  updated_at: string;
  submitter: Submitter;
  answers?: SubmissionAnswer[];
};

export type PaginationParams = {
  page: number;
  per_page: number;
};
