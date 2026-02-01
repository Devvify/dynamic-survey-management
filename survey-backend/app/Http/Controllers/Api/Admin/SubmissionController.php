<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveySubmission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    public function index(Request $request, Survey $survey)
    {
        $submissions = SurveySubmission::query()
            ->where('survey_id', $survey->id)
            ->with(['submitter:id,name,email'])
            ->latest()
            ->paginate((int) ($request->query('per_page', 10)));

        return response()->json($submissions);
    }

    public function show(SurveySubmission $submission)
    {
        $submission->load([
            'submitter:id,name,email',
            'survey:id,title',
            'answers.field.options',
        ]);

        return response()->json($submission);
    }
}
