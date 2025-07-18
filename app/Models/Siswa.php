<?php

namespace App\Models;

use App\Observers\SiswaObserver;
use App\Traits\HasSiswaRoles;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

#[ObservedBy([SiswaObserver::class])]
class Siswa extends Model
{
    use HasFactory, HasSiswaRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'nama',
        'nis',
        'nisn',
        'nik',
        'jk',
        'tempat_lahir',
        'tanggal_lahir',
        'telepon',
        'alamat',
        'wilayah_id',
        'status_dalam_keluarga',
        'anak_ke',
        'asal_sekolah',
        'tahun_masuk',
        'nama_ayah',
        'pekerjaan_ayah',
        'nama_ibu',
        'pekerjaan_ibu',
        'nama_wali',
        'pekerjaan_wali',
        'telepon_wali',
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
            'user_id' => 'integer',
            'tanggal_lahir' => 'date',
            'village_id' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function anggotaKelas(): HasMany
    {
        return $this->hasMany(AnggotaKelas::class);
    }

    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class, 'anggota_kelas', 'siswa_id', 'kelas_id')
            ->withTimestamps();
    }

    public function wilayah(): BelongsTo
    {
        return $this->belongsTo(Wilayah::class);
    }

    public function proyek(): HasManyThrough
    {
        return $this->hasManyThrough(Proyek::class, AnggotaKelas::class);
    }

    public function hasilPenilaian(): HasManyThrough
    {
        return $this->hasManyThrough(HasilPenilaian::class, AnggotaKelas::class);
    }

    public function catatanWaliKelas(): HasMany
    {
        return $this->hasMany(CatatanWaliKelas::class);
    }

    public function alamat(): string
    {
        return $this->wilayah ? $this->alamat . ', ' . $this->wilayah->name : $this->alamat;
    }
}
