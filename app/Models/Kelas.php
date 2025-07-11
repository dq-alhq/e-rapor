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

    public function anggotaKelas(): HasMany
    {
        return $this->hasMany(AnggotaKelas::class);
    }

    public function mapels(): BelongsToMany
    {
        return $this->belongsToMany(Mapel::class)
            ->using(Pembelajaran::class)
            ->as('pembelajaran')
            ->withPivot('id', 'kelas_id', 'mapel_id', 'guru_id', 'kkm')
            ->withTimestamps();
    }

    public function gurus(): BelongsToMany
    {
        return $this->belongsToMany(Guru::class)
            ->using(Pembelajaran::class)
            ->as('pembelajaran')
            ->withPivot('id', 'kelas_id', 'mapel_id', 'guru_id', 'kkm')
            ->withTimestamps();
    }

    public function tapel(): BelongsTo
    {
        return $this->belongsTo(Tapel::class);
    }

    public function wali(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }
}
