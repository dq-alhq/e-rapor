<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Tapel extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tahun',
        'semester',
        'tempat_rapor',
        'tanggal_rapor',
        'aktif',
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
            'tanggal_rapor' => 'date',
            'aktif' => 'boolean',
        ];
    }

    public function isAktif(): bool
    {
        return $this->aktif;
    }

    public function kelas(): HasMany
    {
        return $this->hasMany(Kelas::class);
    }

    public function siswa(): HasManyThrough
    {
        return $this->hasManyThrough(AnggotaKelas::class, Kelas::class, 'tapel_id', 'kelas_id');
    }

    public function proyek(): HasMany
    {
        return $this->hasMany(Proyek::class);
    }
}
