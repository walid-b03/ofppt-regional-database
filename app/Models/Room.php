<?php

namespace App\Models;

use App\Models\Concerns\ForUserScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    use ForUserScope;

    protected $fillable = [
        'code',
        'name',
        'type',
        'establishment_id',
    ];

    public function establishment(): BelongsTo
    {
        return $this->belongsTo(Establishment::class);
    }
}
