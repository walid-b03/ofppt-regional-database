<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComplexResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();

        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'location' => $this->location,
            'region' => $this->whenLoaded('region', fn () => new RegionResource($this->region)),
            'region_id' => $this->when($user?->isAdmin() || $user?->isDRRG(), $this->region_id),
            'head' => $this->whenLoaded('head', fn () => new UserResource($this->head)),
            'head_id' => $this->when($user?->isAdmin() || $user?->isDRRG(), $this->head_id),
            'establishments_count' => $this->whenCounted('establishments'),
            'establishments' => $this->whenLoaded('establishments', fn () => EstablishmentResource::collection($this->establishments)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
