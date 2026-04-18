<?php

namespace App\Policies;

use App\Models\Room;
use App\Models\User;

class RoomPolicy
{
    public function before(User $authUser): ?bool
    {
        return $authUser->isAdmin() ?: null;
    }

    public function viewAny(User $authUser): bool
    {
        return ! $authUser->isFRMT();
    }

    public function view(User $authUser, Room $room): bool
    {
        return ! $authUser->isFRMT() && ($authUser?->establishment_id === $room->establishment_id
            || $authUser->headedComplex?->id === $room->establishment->complex_id
            || $authUser->headedRegion?->id === $room->establishment->complex->region_id
        );
    }

    public function create(User $authUser): bool
    {
        return $this->viewAny($authUser);
    }

    public function update(User $authUser, Room $room): bool
    {
        return $this->view($authUser, $room);
    }

    public function forceDelete(User $authUser): bool
    {
        return $authUser->isAdmin();
    }
}
