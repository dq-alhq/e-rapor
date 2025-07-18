<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ekskul extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'guru_id',
        'nama',
        'deskripsi',
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
            'guru_id' => 'integer',
        ];
    }

    public function guru(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }

    public function anggota_kelas(): BelongsToMany
    {
        return $this->belongsToMany(AnggotaKelas::class, 'anggota_ekskuls', 'ekskul_id', 'anggota_kelas_id');
    }

    public function anggota_ekskul(): HasMany
    {
        return $this->hasMany(AnggotaEkskul::class);
    }
}
