<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne};
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'code',
        'first_name',
        'last_name',
        'cin',
        'marital_status',
        'children',
        'email',
        'phone',
        'address',
        'date_of_birth',
        'date_of_recruitment',
        'diploma',
        'rank',
        'role',
        'role_description',
        'password',
        'establishment_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'date_of_recruitment' => 'date',
        'children' => 'integer',
        'password' => 'hashed',
    ];

    // Auth identifier
    public function getAuthIdentifierName(): string
    {
        return 'code';
    }

    // Relationships
    public function establishment(): BelongsTo
    {
        return $this->belongsTo(Establishment::class);
    }

    public function headedRegion(): HasOne
    {
        return $this->hasOne(Region::class, 'head_id');
    }

    public function headedComplex(): HasOne
    {
        return $this->hasOne(Complex::class, 'head_id');
    }

    public function headedEstablishment(): HasOne
    {
        return $this->hasOne(Establishment::class, 'head_id');
    }

    // Helpers
    public function isAdmin(): bool
    {
        return $this->role === "admin";
    }

    public function isDRRG(): bool
    {
        return $this->headedRegion()->exists() && $this->role === "DRRG";
    }

    public function isDRCX(): bool
    {
        return $this->headedComplex()->exists() && $this->role === "DRCX";
    }

    public function isDRPD(): bool
    {
        return $this->headedEstablishment()->exists() && $this->role === "DRPD";
    }

    public function isAGAD(): bool
    {
        return $this->role === "AGAD";
    }

    public function isFRMT(): bool
    {
        return $this->role === "FRMT";
    }


    // Scopes
    public function scopeForSuperior($query, User $user)
    {
        if ($user->isAdmin()) {
            return $query;
        }

        if ($user->isDRRG()) {
            return $query->whereHas('establishment.complex', function($q) use($user) {
                $q->where('region_id', $user->establishment->complex->region_id);
            });
        }

        if ($user->isDRCX()) {
            return $query->whereHas('establishment', function($q) use($user) {
                $q->where('complex_id', $user->establishment->complex_id);
            });
        }

        if ($user->isDRPD()) {
            return $query->where('establishment_id', $user->establishment_id);
        }

        return $query->where('id', $user->id);
    }
}
