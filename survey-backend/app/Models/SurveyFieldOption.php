<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurveyFieldOption extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'field_id',
        'label',
        'value',
        'order',
    ];

    protected $casts = [
        'deleted_at' => 'datetime',
    ];

    public function field(): BelongsTo
    {
        return $this->belongsTo(SurveyField::class, 'field_id');
    }
}
