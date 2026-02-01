<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
            'fields' => ['required', 'array', 'min:1'],
            'fields.*.key' => ['required', 'string', 'max:64'],
            'fields.*.label' => ['required', 'string', 'max:255'],
            'fields.*.type' => ['required', Rule::in(['text', 'checkbox', 'radio', 'select'])],
            'fields.*.is_required' => ['required', 'boolean'],
            'fields.*.help_text' => ['nullable', 'string', 'max:255'],
            'fields.*.order' => ['nullable', 'integer', 'min:0'],
            'fields.*.options' => ['nullable', 'array'],
            'fields.*.options.*.label' => ['required_with:fields.*.options', 'string', 'max:255'],
            'fields.*.options.*.value' => ['required_with:fields.*.options', 'string', 'max:255'],
            'fields.*.options.*.order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            $fields = $this->input('fields', []);

            // 1) unique field keys in payload
            $keys = array_column($fields, 'key');
            if (count($keys) !== count(array_unique($keys))) {
                $v->errors()->add('fields', 'Field keys must be unique.');
            }

            foreach ($fields as $i => $field) {
                $type = $field['type'] ?? 'text';
                $options = $field['options'] ?? [];

                $needsOptions = in_array($type, ['checkbox', 'radio', 'select'], true);
                $hasOptions = is_array($options) && count($options) > 0;

                // 2) options required/forbidden
                if ($needsOptions && !$hasOptions) {
                    $v->errors()->add("fields.$i.options", 'Options are required for this field type.');
                    continue;
                }

                if (!$needsOptions && $hasOptions) {
                    $v->errors()->add("fields.$i.options", 'Options are not allowed for text fields.');
                    continue;
                }

                // 3) unique option values per field
                if ($needsOptions && $hasOptions) {
                    $values = array_column($options, 'value');
                    if (count($values) !== count(array_unique($values))) {
                        $v->errors()->add("fields.$i.options", 'Option values must be unique per field.');
                    }
                }
            }
        });
    }
}
