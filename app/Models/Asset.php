<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Concerns\ForUserScope;

class Asset extends Model
{
    use SoftDeletes, ForUserScope;

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
