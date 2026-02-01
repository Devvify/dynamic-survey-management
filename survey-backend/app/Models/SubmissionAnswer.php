<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionAnswer extends Model
{
   protected $fillable = [
        'submission_id',
        'field_id',
        'value_text',
        'value_json',
    ];

    protected $casts = [
        'value_json' => 'array',
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(SurveySubmission::class, 'submission_id');
    }

    public function field(): BelongsTo
    {
        return $this->belongsTo(SurveyField::class, 'field_id');
    }
}
