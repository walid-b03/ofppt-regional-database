<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'type' => $this->type,
            'level' => $this->level,
            'is_trunk' => $this->is_trunk,
            'duration' => $this->duration,
            'description' => $this->description,
            'establishment_id' => $this->establishment_id,
        ];
    }
}
