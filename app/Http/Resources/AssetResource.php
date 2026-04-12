<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $isHead = $user?->isAdmin()
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
            'description' => $this->when($isHead, $this->description),
            'notes' => $this->when($isHead, $this->notes),
            'establishment' => $this->whenLoaded('establishment', fn () => new EstablishmentResource($this->establishment)),
            'establishment_id' => $this->when($isHead, $this->establishment_id),
            'created_at' => $this->when($isHead, $this->created_at),
            'updated_at' => $this->when($isHead, $this->updated_at),
        ];
    }
}
