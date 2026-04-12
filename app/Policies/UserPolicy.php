<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function before(User $user): ?bool
    {
        return $user->isAdmin() ?: null;
    }

    public function viewAny(User $user): bool
    {
        return $user->isDRPD() || $user->isDRCX() || $user->isDRRG();
    }

    public function view(User $user, User $model): bool
    {
        return $user->headedEstablishment?->id === $model->establishment_id
            || $user->headedComplex?->id === $model->establishment?->complex_id
            || $user->headedRegion?->id === $model->establishment?->complex?->region_id;
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    public function update(User $user, User $model): bool
    {
        return $this->view($user, $model);
    }

    public function delete(User $user, User $model): bool
    {
        return $this->view($user, $model);
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
