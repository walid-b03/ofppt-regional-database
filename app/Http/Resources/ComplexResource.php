<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComplexResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'city' => $this->city,
            'region' => $this->whenLoaded('region', fn () => new RegionResource($this->region)),
            'head' => $this->whenLoaded('head', fn () => new UserResource($this->head)),
            'establishments_count' => $this->whenCounted('establishments'),
            'establishments' => $this->whenLoaded('establishments', fn () => EstablishmentResource::collection($this->establishments)),
        ];
    }
}
