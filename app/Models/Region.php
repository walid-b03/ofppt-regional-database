<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Region extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'code',
        'name',
        'email',
        'phone',
        'head_id',
    ];

    // Relationships
    public function head(): BelongsTo
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    public function complexes(): HasMany
    {
        return $this->hasMany(Complex::class);
    }

    // Scopes
    public function scopeForHead($query, User $user)
    {
        if ($user->isAdmin()) {
            return $query;
        }

        if ($user->isDRRG()) {
            return $query->where('id', $user->headedRegion->id);
        }

        return $query->where('id', 0);
    }
}
