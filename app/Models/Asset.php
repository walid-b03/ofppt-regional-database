<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Concerns\ForUserScope;

class Asset extends Model
{
    use ForUserScope;

    protected $fillable = [
        'code',
        'name',
        'type',
        'state',
        'description',
        'notes',
        'establishment_id',
    ];

    public function establishment(): BelongsTo
    {
        return $this->belongsTo(Establishment::class);
    }
}
