<?php

namespace App\Policies;

use App\Models\Asset;
use App\Models\User;

class AssetPolicy
{
    public function before(User $authUser): ?bool
    {
        return $authUser->isAdmin() ?: null;
    }

    public function viewAny(User $authUser): bool
    {
        return !$authUser->isFRMT();
    }

    public function view(User $authUser, Asset $asset): bool
    {
        return !$authUser->isFRMT() && ($authUser?->establishment_id === $asset->establishment_id
            || $authUser->headedComplex?->id === $asset->establishment->complex_id
            || $authUser->headedRegion?->id === $asset->establishment->complex->region_id
        );
    }

    public function create(User $authUser): bool
    {
        return $this->viewAny($authUser);
    }

    public function update(User $authUser, Asset $asset): bool
    {
        return $this->view($authUser, $asset);
    }

    public function delete(User $authUser, Asset $asset): bool
    {
        return $this->view($authUser, $asset);
    }

    public function restore(User $authUser): bool
    {
        return $authUser->isAdmin();
    }

    public function forceDelete(User $authUser): bool
    {
        return $authUser->isAdmin();
    }
}

