<?php

namespace App\Policies;

use App\Models\Establishment;
use App\Models\User;

class EstablishmentPolicy
{
    public function before(User $user): ?bool
    {
        return $user->isAdmin() ?: null;
    }

    public function viewAny(User $user): bool
    {
        return $user->isDRPD() || $user->isDRCX() || $user->isDRRG();
    }

    public function view(User $user, Establishment $establishment): bool
    {
        return $user->headedEstablishment?->id === $establishment->id
            || $user->headedComplex?->id === $establishment->complex_id
            || $user->headedRegion?->id === $establishment->complex->region_id;
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    public function update(User $user, Establishment $establishment): bool
    {
        return $this->view($user, $establishment);
    }

    public function delete(User $user, Establishment $establishment): bool
    {
        return $this->view($user, $establishment);
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
