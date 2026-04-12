<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $isSuperior = $user?->isAdmin()
            || $user?->isDRRG()
            || $user?->isDRCX()
            || $user?->isDRPD()
            || $user?->isAGAD();

        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'type' => $this->type,
            'level' => $this->level,
            'is_trunk' => $this->is_trunk,
            'duration' => $this->duration,
            'description' => $this->when($isSuperior, $this->description),
            'establishment' => $this->whenLoaded('establishment', fn () => new EstablishmentResource($this->establishment)),
            'establishment_id' => $this->when($isSuperior, $this->establishment_id),
            'created_at' => $this->when($isSuperior, $this->created_at),
            'updated_at' => $this->when($isSuperior, $this->updated_at),
        ];
    }
}
