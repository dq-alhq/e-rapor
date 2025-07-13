<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AnggotaKelas extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'siswa_id',
        'kelas_id',
        'nilai_uts',
        'rata_uts',
        'nilai_akhir',
        'rata_akhir',
        'absensi_alpha',
        'absensi_izin',
        'absensi_sakit',
        'cek_wali',
        'cek_kepsek',
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
            'siswa_id' => 'integer',
            'kelas_id' => 'integer',
            'nilai_uts' => 'decimal:2',
            'rata_uts' => 'decimal:2',
            'nilai_akhir' => 'decimal:2',
            'rata_akhir' => 'decimal:2',
            'cek_wali' => 'boolean',
            'cek_kepsek' => 'boolean',
        ];
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Kelas::class);
    }

    public function hasilPenilaian(): HasMany
    {
        return $this->hasMany(HasilPenilaian::class);
    }

    public function anggotaEkskul(): HasMany
    {
        return $this->hasMany(AnggotaEkskul::class);
    }

    public function anggotaProyek(): HasMany
    {
        return $this->hasMany(AnggotaProyek::class);
    }

    public function catatanWaliKelas(): HasMany
    {
        return $this->hasMany(CatatanWaliKelas::class);
    }


}
