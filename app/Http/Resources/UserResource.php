<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role,
            'role_label' => $this->role_label,
            'establishment' => $this->whenLoaded('establishment', fn () => new EstablishmentResource($this->establishment)),
            'headed_region' => $this->whenLoaded('headedRegion', fn () => new RegionResource($this->headedRegion)),
            'headed_complex' => $this->whenLoaded('headedComplex', fn () => new ComplexResource($this->headedComplex)),
            'headed_establishment' => $this->whenLoaded('headedEstablishment', fn () => new EstablishmentResource($this->headedEstablishment)),
        ];
    }
}
