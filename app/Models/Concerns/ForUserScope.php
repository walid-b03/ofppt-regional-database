<?php

namespace App\Models\Concerns;

use App\Models\User;

trait ForUserScope
{
    public function scopeForUser($query, User $user)
    {
        if ($user->isAdmin()) {
            return $query->with(['establishment.complex.region']);
        }

        if ($user->isDRRG()) {
            return $query->with(['establishment.complex.region'])->whereHas('establishment.complex', function($q) use($user) {
                $q->where('region_id', $user->headedRegion->id);
            });
        }

        if ($user->isDRCX()) {
            return $query->with(['establishment.complex.region'])->whereHas('establishment', function($q) use($user) {
                $q->where('complex_id', $user->headedComplex->id);
            });
        }

        if ($user->isDRPD() || $user->isAGAD()) {
            return $query->with(['establishment.complex.region'])->where('establishment_id', $user->establishment_id);
        }

        return $query->where('id', 0);
    }
}
