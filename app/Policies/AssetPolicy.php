<?php

namespace App\Policies;

use App\Models\Asset;
use App\Models\User;

class AssetPolicy
{
    public function before(User $user): ?bool
    {
        return $user->isAdmin() ?: null;
    }

    public function viewAny(User $user): bool
    {
        return !$user->isFRMT();
    }

    public function view(User $user, Asset $asset): bool
    {
        return !$user->isFRMT() && ($user->establishment_id === $asset->establishment_id
            || $user->headedComplex?->id === $asset->establishment->complex_id
            || $user->headedRegion?->id === $asset->establishment->complex->region_id
        );
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    public function update(User $user, Asset $asset): bool
    {
        return $this->view($user, $asset);
    }

    public function delete(User $user, Asset $asset): bool
    {
        return $this->view($user, $asset);
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

