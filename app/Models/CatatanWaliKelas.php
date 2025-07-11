<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CatatanWaliKelas extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wali_id',
        'anggota_kelas_id',
        'catatan',
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
            'wali_id' => 'integer',
            'anggota_kelas_id' => 'integer',
        ];
    }

    public function wali(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }

    public function anggotaKelas(): BelongsTo
    {
        return $this->belongsTo(\App\Models\AnggotaKelas::class);
    }
}
