<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EstablishmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();

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
            'complex_id' => $this->when($user?->isAdmin() || $user?->isDRRG() || $user?->isDRCX(), $this->complex_id),
            'head' => $this->whenLoaded('head', fn () => new UserResource($this->head)),
            'head_id' => $this->when($user?->isAdmin() || $user?->isDRRG() || $user?->isDRCX(), $this->head_id),
            'users_count' => $this->whenCounted('users'),
            'trainings_count' => $this->whenCounted('trainings'),
            'assets_count' => $this->whenCounted('assets'),
            'rooms_count' => $this->whenCounted('rooms'),
            'users' => $this->whenLoaded('users', fn () => UserResource::collection($this->users)),
            'trainings' => $this->whenLoaded('trainings', fn () => TrainingResource::collection($this->trainings)),
            'assets' => $this->whenLoaded('assets', fn () => AssetResource::collection($this->assets)),
            'rooms' => $this->whenLoaded('rooms', fn () => RoomResource::collection($this->rooms)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
