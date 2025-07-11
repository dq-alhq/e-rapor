<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnggotaEkskul extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'anggota_kelas_id',
        'ekskul_id',
        'nilai',
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
            'anggota_kelas_id' => 'integer',
            'ekskul_id' => 'integer',
        ];
    }

    public function anggotaKelas(): BelongsTo
    {
        return $this->belongsTo(\App\Models\AnggotaKelas::class);
    }

    public function ekskul(): BelongsTo
    {
        return $this->belongsTo(Ekskul::class);
    }
}
