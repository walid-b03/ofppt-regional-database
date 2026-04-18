<?php

namespace App\Policies;

use App\Models\Establishment;
use App\Models\User;

class EstablishmentPolicy
{
    public function before(User $authUser): ?bool
    {
        return $authUser->isAdmin() ?: null;
    }

    public function viewAny(User $authUser): bool
    {
        return $authUser->isDRPD() || $authUser->isDRCX() || $authUser->isDRRG();
    }

    public function view(User $authUser, Establishment $establishment): bool
    {
        return $authUser->headedEstablishment?->id === $establishment->id
            || $authUser->headedComplex?->id === $establishment->complex_id
            || $authUser->headedRegion?->id === $establishment->complex->region_id;
    }

    public function create(User $authUser): bool
    {
        return $this->viewAny($authUser);
    }

    public function update(User $authUser, Establishment $establishment): bool
    {
        return $this->view($authUser, $establishment);
    }

    public function delete(User $authUser, Establishment $establishment): bool
    {
        return $this->view($authUser, $establishment);
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
