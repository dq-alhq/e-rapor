<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Penilaian extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'pembelajaran_id',
        'nama',
        'materi',
        'tujuan_pembelajaran',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'pembelajaran_id' => 'integer',
            'tujuan_pembelajaran' => 'array',
        ];
    }

    public function pembelajaran(): BelongsTo
    {
        return $this->belongsTo(Pembelajaran::class);
    }
}
