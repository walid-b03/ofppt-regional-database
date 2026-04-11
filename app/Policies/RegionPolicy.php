<?php

namespace App\Policies;

use App\Models\Region;
use App\Models\User;

class RegionPolicy
{
    public function before(User $user): ?bool
    {
        return $user->isAdmin() ?: null;
    }

    public function viewAny(User $user): bool
    {
        return $user->isDRRG();
    }

    public function view(User $user, Region $region): bool
    {
        return $user->headedRegion?->id === $region->id;
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    public function update(User $user, Region $region): bool
    {
        return $this->view($user, $region);
    }

    public function delete(User $user, Region $region): bool
    {
        return $this->view($user, $region);
    }

    public function restore(User $user): bool
    {
        return $user->isAdmin();
    }

    public function forceDelete(User $user): bool
    {
        return $user->isAdmin();
    }
}
