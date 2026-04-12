<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegionResource extends JsonResource
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
            'head' => $this->whenLoaded('head', fn () => new UserResource($this->head)),
            'head_id' => $this->when($user?->isAdmin(), $this->head_id),
            'complexes_count' => $this->whenCounted('complexes'),
            'complexes' => $this->whenLoaded('complexes', fn () => ComplexResource::collection($this->complexes)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
