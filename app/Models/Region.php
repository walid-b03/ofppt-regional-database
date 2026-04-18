<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Region extends Model
{
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
        $eager = ['head:id,code,first_name,last_name,establishment_id'];

        if ($user->isAdmin()) {
            return $query->with($eager);
        }

        if ($user->isDRRG()) {
            return $query->with($eager)->where('id', $user->headedRegion->id);
        }

        return $query->where('id', 0);
    }
}
