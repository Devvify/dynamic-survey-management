<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\SurveyField;
use App\Models\SurveyFieldOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SurveyController extends Controller
{
    public function index(Request $request)
    {
        $surveys = Survey::query()
            ->latest()
            ->paginate((int) ($request->query('per_page', 10)));

        return SurveyResource::collection($surveys);
    }

    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        $survey = DB::transaction(function () use ($request, $data) {
            $survey = Survey::create([
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'status' => $data['status'] ?? 'active',
                'created_by' => $request->user()->id,
            ]);

            $now = now();
            $fieldRows = [];
            foreach ($data['fields'] as $f) {
                $fieldRows[] = [
                    'survey_id' => $survey->id,
                    'key' => $f['key'],
                    'label' => $f['label'],
                    'type' => $f['type'],
                    'is_required' => (bool) $f['is_required'],
                    'help_text' => $f['help_text'] ?? null,
                    'order' => $f['order'] ?? 0,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
            SurveyField::insert($fieldRows);

            // 2) map field key -> id
            $fieldsByKey = SurveyField::where('survey_id', $survey->id)->get()->keyBy('key');

            // 3) bulk insert options
            $optionRows = [];
            foreach ($data['fields'] as $f) {
                if (empty($f['options']) || !is_array($f['options'])) {
                    continue;
                }

                // Safety: ignore options for text fields
                if (($f['type'] ?? 'text') === 'text') {
                    continue;
                }

                $fieldId = $fieldsByKey[$f['key']]->id;

                foreach ($f['options'] as $opt) {
                    $optionRows[] = [
                        'field_id' => $fieldId,
                        'label' => $opt['label'],
                        'value' => $opt['value'],
                        'order' => $opt['order'] ?? 0,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }
            }

            if ($optionRows) {
                SurveyFieldOption::insert($optionRows);
            }

            return $survey;
        });

        $survey->load('fields.options');

        return (new SurveyResource($survey))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Survey $survey)
    {
        $survey->load('fields.options');
        return new SurveyResource($survey);
    }

    public function destroy(Survey $survey)
    {
        $survey->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
