<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EstablishmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'sector' => $this->sector,
            'type' => $this->type,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'complex' => $this->whenLoaded('complex', fn () => new ComplexResource($this->complex)),
            'head' => $this->whenLoaded('head', fn () => new UserResource($this->head)),
        ];
    }
}
