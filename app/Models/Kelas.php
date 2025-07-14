<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kelas extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tapel_id',
        'wali_id',
        'tingkat',
        'nama',
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
            'tapel_id' => 'integer',
            'wali_id' => 'integer',
        ];
    }

    public function tapel(): BelongsTo
    {
        return $this->belongsTo(Tapel::class);
    }

    public function anggotaKelas(): HasMany
    {
        return $this->hasMany(AnggotaKelas::class);
    }

    public function mapel(): BelongsToMany
    {
        return $this->belongsToMany(Mapel::class, 'pembelajarans', 'kelas_id', 'mapel_id');
    }

    public function guru(): BelongsToMany
    {
        return $this->belongsToMany(Guru::class, 'pembelajarans', 'kelas_id', 'guru_id');
    }

    public function siswa(): BelongsToMany
    {
        return $this->belongsToMany(Siswa::class, 'anggota_kelas', 'kelas_id', 'siswa_id');
    }

    public function wali(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }

}
