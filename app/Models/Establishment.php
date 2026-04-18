<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Establishment extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'code',
        'name',
        'sector',
        'type',
        'email',
        'phone',
        'address',
        'head_id',
        'complex_id',
    ];

    // Relationships
    public function head(): BelongsTo
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    public function complex(): BelongsTo
    {
        return $this->belongsTo(Complex::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    public function trainings(): HasMany
    {
        return $this->hasMany(Training::class);
    }

    // Scopes
    public function scopeForHead($query, User $user)
    {

        $eager = [
            'head:id,code,role,first_name,last_name,establishment_id',
            'complex:id,code,name,head_id,region_id',
        ];

        if ($user->isAdmin()) {
            return $query->with($eager);
        }

        if ($user->isDRRG()) {
            return $query->with($eager)->whereHas('complex', function($q) use($user) {
                $q->where('region_id', $user->headedRegion->id);
            });
        }

        if ($user->isDRCX()) {
            return $query->with($eager)->where('complex_id', $user->headedComplex->id);
        }

        if ($user->isDRPD()) {
            return $query->with($eager)->where('id', $user->headedEstablishment->id);
        }

        return $query->where('id', 0);
    }
}
