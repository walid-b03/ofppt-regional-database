<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $isSelf = $user?->id === $this->id;
        $isSuperior = $user?->isAdmin()
            || $user?->isDRRG()
            || $user?->isDRCX()
            || $user?->isDRPD();
        $canSeePasswords = $isSuperior || $isSelf;

        return [
            'id' => $this->id,
            'code' => $this->code,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'cin' => $this->when($isSuperior, $this->cin),
            'marital_status' => $this->when($isSuperior || $isSelf, $this->marital_status),
            'children' => $this->when($isSuperior || $isSelf, $this->children),
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->when($isSuperior || $isSelf, $this->address),
            'date_of_birth' => $this->when($isSuperior || $isSelf, $this->date_of_birth),
            'date_of_recruitment' => $this->when($isSuperior, $this->date_of_recruitment),
            'diploma' => $this->when($isSuperior, $this->diploma),
            'rank' => $this->when($isSuperior, $this->rank),
            'role' => $this->when($isSuperior, $this->role),
            'role_label' => $this->when($isSuperior, $this->role_label),
            'password' => $this->when($canSeePasswords, null),
            'establishment' => $this->whenLoaded('establishment', fn () => new EstablishmentResource($this->establishment)),
            'establishment_id' => $this->when($isSuperior, $this->establishment_id),
            'headed_region' => $this->whenLoaded('headedRegion', fn () => new RegionResource($this->headedRegion)),
            'headed_complex' => $this->whenLoaded('headedComplex', fn () => new ComplexResource($this->headedComplex)),
            'headed_establishment' => $this->whenLoaded('headedEstablishment', fn () => new EstablishmentResource($this->headedEstablishment)),
            'created_at' => $this->when($isSuperior, $this->created_at),
            'updated_at' => $this->when($isSuperior, $this->updated_at),
        ];
    }
}
