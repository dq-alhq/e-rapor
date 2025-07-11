<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Mapel extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'kelompok_mapel_id',
        'nama',
        'singkatan',
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
            'kelompok_mapel_id' => 'integer',
        ];
    }

    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class)
            ->using(Pembelajaran::class)
            ->as('pembelajaran')
            ->withPivot('id', 'kelas_id', 'mapel_id', 'guru_id', 'kkm')
            ->withTimestamps();
    }

    public function guru(): BelongsToMany
    {
        return $this->belongsToMany(Guru::class, 'pembelajarans', 'mapel_id', 'guru_id');
    }

    public function kelompokMapel(): BelongsTo
    {
        return $this->belongsTo(KelompokMapel::class);
    }
}
