<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SurveySubmission extends Model
{
     protected $fillable = [
        'survey_id',
        'submitted_by',
    ];

    public function survey(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }

    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(SubmissionAnswer::class, 'submission_id');
    }
}
