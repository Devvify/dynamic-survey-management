<?php

namespace App\Http\Controllers\Api\Officer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Officer\SubmitSurveyRequest;
use App\Models\Survey;
use App\Services\SurveySubmissionService;

class SubmissionController extends Controller
{
    public function __construct(private readonly SurveySubmissionService $service) {}
    public function store(SubmitSurveyRequest $request, Survey $survey)
    {
        if ($survey->status !== 'active') {
            return response()->json(['message' => 'Survey is not available'], 422);
        }

        $submission = $this->service->submit(
            survey: $survey,
            submittedBy: $request->user()->id,
            answers: $request->validated()['answers']
        );

        return response()->json([
            'message' => 'Submitted',
            'submission_id' => $submission->id,
        ], 201);
    }
}
