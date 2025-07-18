<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Jadwal extends Model
{
    protected $fillable = [
        'tapel_id',
        'pembelajaran_id',
        'hari',
        'jam',
    ];

    protected function casts(): array
    {
        return [
            'hari' => 'string',
            'jam' => 'integer',
        ];
    }

    public function pembelajaran(): BelongsTo
    {
        return $this->belongsTo(Pembelajaran::class);
    }

    public function tapel(): BelongsTo
    {
        return $this->belongsTo(Tapel::class);
    }
}
