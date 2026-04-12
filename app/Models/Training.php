<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Concerns\ForUserScope;

class Training extends Model
{
    use SoftDeletes, ForUserScope;

    protected $fillable = [
        'code',
        'name',
        'type',
        'level',
        'is_trunk',
        'duration',
        'description',
        'establishment_id',
    ];

    protected $casts = [
        'is_trunk' => 'boolean',
        'duration' => 'integer',
    ];

    public function establishment(): BelongsTo
    {
        return $this->belongsTo(Establishment::class);
    }
}
