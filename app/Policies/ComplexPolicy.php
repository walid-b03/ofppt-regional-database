<?php

namespace App\Policies;

use App\Models\Complex;
use App\Models\User;

class ComplexPolicy
{
    public function before(User $authUser): ?bool
    {
        return $authUser->isAdmin() ?: null;
    }

    public function viewAny(User $authUser): bool
    {
        return $authUser->isDRCX() || $authUser->isDRRG();
    }

    public function view(User $authUser, Complex $complex): bool
    {
        return $authUser->headedComplex?->id === $complex->id
            || $authUser->headedRegion?->id === $complex->region_id;
    }

    public function create(User $authUser): bool
    {
        return $this->viewAny($authUser);
    }

    public function update(User $authUser, Complex $complex): bool
    {
        return $this->view($authUser, $complex);
    }

    public function delete(User $authUser, Complex $complex): bool
    {
        return $this->view($authUser, $complex);
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
