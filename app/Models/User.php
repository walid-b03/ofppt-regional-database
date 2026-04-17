<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne};
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, SoftDeletes;

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
        'role_label',
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
        return $this->role === "DRRG" && $this->headedRegion !== null;
    }

    public function isDRCX(): bool
    {
        return $this->role === "DRCX" && $this->headedComplex !== null;
    }

    public function isDRPD(): bool
    {
        return $this->role === "DRPD" && $this->headedEstablishment !== null;
    }

    public function isAGAD(): bool
    {
        return $this->role === "AGAD";
    }

    public function isFRMT(): bool
    {
        return $this->role === "FRMT";
    }

    public function setRoleAttribute($value): void
    {
        $this->attributes['role'] = $value;
        $this->attributes['role_label'] = match ($value) {
            'admin'  => 'admin',
            'DRRG'   => 'Directeur Régional',
            'DRCX'   => 'Directeur de Complexe',
            'DRPD'   => 'Directeur Pédagogique',
            'AGAD'   => 'Agent Administratif',
            'FRMT'   => 'Formateur',
            default  => null,
        };
    }

    public function availableRoles(): array
    {
        $roles = [
            'admin' => ['admin', 'DRRG', 'DRCX', 'DRPD', 'AGAD', 'FRMT'],
            'DRRG'  => ['DRCX', 'DRPD', 'AGAD', 'FRMT'],
            'DRCX'  => ['DRPD', 'AGAD', 'FRMT'],
            'DRPD'  => ['AGAD', 'FRMT'],
            'AGAD'  => [],
            'FRMT'  => [],
        ];

        return $roles[$this->role];
    }

    // Scopes
    public function scopeForSuperior($query, User $user)
    {
        if ($user->isAdmin()) {
            return $query->with('establishment.complex.region');
        }

        if ($user->isDRRG()) {
            return $query->with('establishment.complex.region')->whereHas('establishment.complex', function($q) use($user) {
                $q->where('region_id', $user->headedRegion->id);
            });
        }

        if ($user->isDRCX()) {
            return $query->with('establishment.complex.region')->whereHas('establishment', function($q) use($user) {
                $q->where('complex_id', $user->headedComplex->id);
            });
        }

        if ($user->isDRPD()) {
            return $query->with('establishment.complex.region')->where('establishment_id', $user->headedEstablishment->id);
        }

        return $query->where('id', $user->id);
    }
}
