<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Survey extends Model
{
    use SoftDeletes;
     protected $fillable = [
        'title',
        'description',
        'created_by',
        'status',
    ];
    protected $casts = [
        'deleted_at' => 'datetime',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function fields(): HasMany
    {
        return $this->hasMany(SurveyField::class)->orderBy('order');
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(SurveySubmission::class);
    }
}
