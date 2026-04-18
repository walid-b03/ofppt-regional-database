<?php

namespace App\Policies;

use App\Models\Training;
use App\Models\User;

class TrainingPolicy
{
    public function before(User $authUser): ?bool
    {
        return $authUser->isAdmin() ?: null;
    }

    public function viewAny(User $authUser): bool
    {
        return !$authUser->isFRMT();
    }

    public function view(User $authUser, Training $training): bool
    {
        return !$authUser->isFRMT() && ($authUser?->establishment_id === $training->establishment_id
            || $authUser->headedComplex?->id === $training->establishment->complex_id
            || $authUser->headedRegion?->id === $training->establishment->complex->region_id
        );
    }

    public function create(User $authUser): bool
    {
        return $this->viewAny($authUser);
    }

    public function update(User $authUser, Training $training): bool
    {
        return $this->view($authUser, $training);
    }

    public function delete(User $authUser, Training $training): bool
    {
        return $this->view($authUser, $training);
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
