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
        $isHead = $user?->isAdmin()
            || $user?->isDRRG()
            || $user?->isDRCX()
            || $user?->isDRPD();
        $canSeePasswords = $isHead || $isSelf;

        return [
            'id' => $this->id,
            'code' => $this->code,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'cin' => $this->when($isHead, $this->cin),
            'marital_status' => $this->when($isHead || $isSelf, $this->marital_status),
            'children' => $this->when($isHead || $isSelf, $this->children),
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->when($isHead || $isSelf, $this->address),
            'date_of_birth' => $this->when($isHead || $isSelf, $this->date_of_birth),
            'date_of_recruitment' => $this->when($isHead, $this->date_of_recruitment),
            'diploma' => $this->when($isHead, $this->diploma),
            'rank' => $this->when($isHead, $this->rank),
            'role' => $this->when($isHead, $this->role),
            'role_description' => $this->when($isHead, $this->role_description),
            'password' => $this->when($canSeePasswords, null),
            'establishment' => $this->whenLoaded('establishment', fn () => new EstablishmentResource($this->establishment)),
            'establishment_id' => $this->when($isHead, $this->establishment_id),
            'headed_region' => $this->whenLoaded('headedRegion', fn () => new RegionResource($this->headedRegion)),
            'headed_complex' => $this->whenLoaded('headedComplex', fn () => new ComplexResource($this->headedComplex)),
            'headed_establishment' => $this->whenLoaded('headedEstablishment', fn () => new EstablishmentResource($this->headedEstablishment)),
            'created_at' => $this->when($isHead, $this->created_at),
            'updated_at' => $this->when($isHead, $this->updated_at),
        ];
    }
}
