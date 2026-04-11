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

    public function head(): BelongsTo
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    public function complexes(): HasMany
    {
        return $this->hasMany(Complex::class);
    }
}
