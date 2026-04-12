<?php

namespace App\Models\Concerns;

use App\Models\User;

trait ForUserScope
{
    public function scopeForUser($query, User $user)
    {
        if ($user->isAdmin()) {
            return $query;
        }

        if ($user->isDRRG()) {
            return $query->whereHas('establishment.complex', function($q) use($user) {
                $q->where('region_id', $user->headedRegion->id);
            });
        }

        if ($user->isDRCX()) {
            return $query->whereHas('establishment', function($q) use($user) {
                $q->where('complex_id', $user->headedComplex->id);
            });
        }

        if ($user->isDRPD() || $user->isAGAD()) {
            return $query->where('establishment_id', $user->headedEstablishment->id);
        }

        return $query->where('id', 0);
    }
}
