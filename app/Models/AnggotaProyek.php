<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnggotaProyek extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'anggota_kelas_id',
        'proyek_id',
        'pencapaian',
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
            'proyek_id' => 'integer',
            'pencapaian' => 'array',
        ];
    }

    public function anggotaKelas(): BelongsTo
    {
        return $this->belongsTo(\App\Models\AnggotaKelas::class);
    }

    public function proyek(): BelongsTo
    {
        return $this->belongsTo(Proyek::class);
    }
}
