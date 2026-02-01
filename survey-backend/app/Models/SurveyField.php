<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurveyField extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'survey_id',
        'key',
        'label',
        'type',       // text|checkbox|radio|select
        'is_required',
        'help_text',
        'order',
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    public function survey(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(SurveyFieldOption::class, 'field_id')->orderBy('order');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(SubmissionAnswer::class, 'field_id');
    }

    public function supportsOptions(): bool
    {
        return in_array($this->type, ['checkbox', 'radio', 'select'], true);
    }
}
