<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyFieldResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'survey_id' => $this->survey_id,
            'key' => $this->key,
            'label' => $this->label,
            'type' => $this->type,
            'is_required' => (bool) $this->is_required,
            'help_text' => $this->help_text,
            'order' => (int) $this->order,
            'options' => SurveyFieldOptionResource::collection($this->whenLoaded('options')),
        ];
    }
}
