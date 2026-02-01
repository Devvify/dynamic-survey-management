<?php

namespace App\Services;

use App\Models\SubmissionAnswer;
use App\Models\Survey;
use App\Models\SurveyField;
use App\Models\SurveyFieldOption;
use App\Models\SurveySubmission;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class SurveySubmissionService
{
    public function submit(Survey $survey, int $submittedBy, array $answers): SurveySubmission
    {
        $fields = SurveyField::where('survey_id', $survey->id)
            ->orderBy('order')
            ->get();

        $options = SurveyFieldOption::whereIn(
            'field_id',
            $fields->whereIn('type', ['checkbox', 'radio', 'select'])->pluck('id')
        )
            ->get()
            ->groupBy('field_id');

        foreach ($fields as $field) {
            $valueExists = array_key_exists($field->key, $answers);

            if ($field->is_required && !$valueExists) {
                throw ValidationException::withMessages([
                    "answers.{$field->key}" => ['This field is required.'],
                ]);
            }

            if (!$valueExists) {
                continue;
            }

            $value = $answers[$field->key];

            if ($field->type === 'checkbox' && $field->is_required && is_array($value) && count($value) === 0) {
                throw ValidationException::withMessages([
                    "answers.{$field->key}" => ['Please select at least one option.'],
                ]);
            }

            // Type validation
            if ($field->type === 'checkbox' && !is_array($value)) {
                throw ValidationException::withMessages([
                    "answers.{$field->key}" => ['Must be an array.'],
                ]);
            }

            if ($field->type !== 'checkbox' && is_array($value)) {
                throw ValidationException::withMessages([
                    "answers.{$field->key}" => ['Must be a single value.'],
                ]);
            }

            // Option validation
            if (in_array($field->type, ['checkbox', 'radio', 'select'], true)) {
                $allowed = $options->get($field->id, collect())->pluck('value')->all();

                if (count($allowed) === 0) {
                    throw ValidationException::withMessages([
                        "answers.{$field->key}" => ['No options configured for this field.'],
                    ]);
                }

                foreach ((array) $value as $v) {
                    if (!in_array((string) $v, $allowed, true)) {
                        throw ValidationException::withMessages([
                            "answers.{$field->key}" => ['Invalid option selected.'],
                        ]);
                    }
                }
            }
        }

        return DB::transaction(function () use ($survey, $submittedBy, $fields, $answers) {
            $submission = SurveySubmission::create([
                'survey_id' => $survey->id,
                'submitted_by' => $submittedBy,
            ]);

            $rows = [];

            foreach ($fields as $field) {
                if (!array_key_exists($field->key, $answers)) {
                    continue;
                }

                $value = $answers[$field->key];

                $rows[] = [
                    'submission_id' => $submission->id,
                    'field_id' => $field->id,
                    'value_text' => $field->type === 'checkbox' ? null : (string) $value,
                    'value_json' => $field->type === 'checkbox' ? json_encode(array_values($value)) : null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            if ($rows) {
                SubmissionAnswer::insert($rows);
            }

            return $submission;
        });
    }
}
