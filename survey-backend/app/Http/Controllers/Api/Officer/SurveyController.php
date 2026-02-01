<?php

namespace App\Http\Controllers\Api\Officer;

use App\Http\Controllers\Controller;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function index(Request $request)
    {
        $surveys = Survey::query()
            ->active()
            ->latest()
            ->paginate((int) ($request->query('per_page', 10)));

        return SurveyResource::collection($surveys);
    }

    public function show(Survey $survey)
    {
        if ($survey->status !== 'active') {
            return response()->json(['message' => 'Survey is not available'], 404);
        }

        $survey->load(['fields.options']);
        return new SurveyResource($survey);
    }
}
