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

    // Auth identifier
    public function getAuthIdentifierName(): string
    {
        return 'code';
    }
}
