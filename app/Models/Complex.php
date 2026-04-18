<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Complex extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'code',
        'name',
        'email',
        'phone',
        'city',
        'head_id',
        'region_id',
    ];

    // Relationships
    public function head(): BelongsTo
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function establishments(): HasMany
    {
        return $this->hasMany(Establishment::class);
    }

    // Scopes
    public function scopeForHead($query, User $user)
    {
        $eager = [
            'head:id,code,first_name,last_name,establishment_id',
            'region:id,code,name,head_id'
        ];

        if ($user->isAdmin()) {
            return $query->with($eager);
        }

        if ($user->isDRRG()) {
            return $query->with($eager)->where('region_id', $user->headedRegion->id);
        }

        if ($user->isDRCX()) {
            return $query->with($eager)->where('id', $user->headedComplex->id);
        }

        return $query->where('id', 0);
    }
}
