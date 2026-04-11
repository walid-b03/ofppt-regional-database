<?php

namespace App\Policies;

use App\Models\Complex;
use App\Models\User;

class ComplexPolicy
{
    public function before(User $user): ?bool
    {
        return $user->isAdmin() ?: null;
    }

    public function viewAny(User $user): bool
    {
        return $user->isDRCX() || $user->isDRRG();
    }

    public function view(User $user, Complex $complex): bool
    {
        return $user->headedComplex?->id === $complex->id
            || $user->headedRegion?->id === $complex->region_id;
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    public function update(User $user, Complex $complex): bool
    {
        return $this->view($user, $complex);
    }

    public function delete(User $user, Complex $complex): bool
    {
        return $this->view($user, $complex);
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
