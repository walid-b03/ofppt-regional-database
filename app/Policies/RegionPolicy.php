<?php

namespace App\Policies;

use App\Models\Region;
use App\Models\User;

class RegionPolicy
{
    public function before(User $authUser): ?bool
    {
        return $authUser->isAdmin() ?: null;
    }

    public function viewAny(User $authUser): bool
    {
        return $authUser->isDRRG();
    }

    public function view(User $authUser, Region $region): bool
    {
        return $authUser->headedRegion?->id === $region->id;
    }

    public function create(User $authUser): bool
    {
        return $this->viewAny($authUser);
    }

    public function update(User $authUser, Region $region): bool
    {
        return $this->view($authUser, $region);
    }

    public function forceDelete(User $authUser): bool
    {
        return $authUser->isAdmin();
    }
}
