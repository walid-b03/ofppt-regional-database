<?php

namespace App\Models\Concerns;

use App\Models\User;

trait ForUserScope
{
    public function scopeForUser($query, User $authUser)
    {
        $eager = [
            'establishment:id,code,name,head_id,complex_id',
            'establishment.complex:id,head_id,region_id'
        ];

        if ($authUser->isAdmin()) {
            return $query->with($eager);
        }

        if ($authUser->isDRRG()) {
            return $query->with($eager)->whereHas('establishment.complex', function($q) use($authUser) {
                $q->where('region_id', $authUser->headedRegion->id);
            });
        }

        if ($authUser->isDRCX()) {
            return $query->with($eager)->whereHas('establishment', function($q) use($authUser) {
                $q->where('complex_id', $authUser->headedComplex->id);
            });
        }

        if ($authUser->isDRPD() || $authUser->isAGAD()) {
            return $query->with($eager)->where('establishment_id', $authUser->establishment_id);
        }

        return $query->where('id', 0);
    }
}
