<?php

namespace App\Policies;

use App\Models\Training;
use App\Models\User;

class TrainingPolicy
{
    public function before(User $user): ?bool
    {
        return $user->isAdmin() ?: null;
    }

    public function viewAny(User $user): bool
    {
        return !$user->isFRMT();
    }

    public function view(User $user, Training $training): bool
    {
        return !$user->isFRMT() && ($user->establishment_id === $training->establishment_id
            || $user->headedComplex?->id === $training->establishment->complex_id
            || $user->headedRegion?->id === $training->establishment->complex->region_id
        );
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    public function update(User $user, Training $training): bool
    {
        return $this->view($user, $training);
    }

    public function delete(User $user, Training $training): bool
    {
        return $this->view($user, $training);
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
