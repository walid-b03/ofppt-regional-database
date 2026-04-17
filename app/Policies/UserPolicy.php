<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function before(User $authUser): ?bool
    {
        return $authUser->isAdmin() ?: null;
    }

    public function viewAny(User $authUser): bool
    {
        return $authUser->isDRPD() || $authUser->isDRCX() || $authUser->isDRRG();
    }

    public function view(User $authUser, User $user): bool
    {
        return $authUser->headedEstablishment?->id === $user->establishment_id
            || $authUser->headedComplex?->id === $user->establishment?->complex_id
            || $authUser->headedRegion?->id === $user->establishment?->complex?->region_id;
    }

    public function create(User $authUser): bool
    {
        return $this->viewAny($authUser);
    }

    public function update(User $authUser, User $user): bool
    {
        return $this->view($authUser, $user);
    }

    public function delete(User $authUser, User $user): bool
    {
        return $this->view($authUser, $user);
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
