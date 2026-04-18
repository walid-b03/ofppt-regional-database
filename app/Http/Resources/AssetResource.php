<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'type' => $this->type,
            'state' => $this->state,
            'description' => $this->description,
            'notes' => $this->notes,
            'establishment' => $this->whenLoaded('establishment', fn () => new EstablishmentResource($this->establishment)),
        ];
    }
}
