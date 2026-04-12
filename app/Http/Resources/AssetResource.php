<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
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
            'state' => $this->state,
            'description' => $this->when($isSuperior, $this->description),
            'notes' => $this->when($isSuperior, $this->notes),
            'establishment' => $this->whenLoaded('establishment', fn () => new EstablishmentResource($this->establishment)),
            'establishment_id' => $this->when($isSuperior, $this->establishment_id),
            'created_at' => $this->when($isSuperior, $this->created_at),
            'updated_at' => $this->when($isSuperior, $this->updated_at),
        ];
    }
}
