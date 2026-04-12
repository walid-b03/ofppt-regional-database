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
        'location',
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
        if ($user->isAdmin()) {
            return $query;
        }

        if ($user->isDRRG()) {
            return $query->where('region_id', $user->headedRegion->id);
        }

        if ($user->isDRCX()) {
            return $query->where('id', $user->headedComplex->id);
        }

        return $query->where('id', 0);
    }
}
