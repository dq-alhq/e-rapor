<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;

class Mapel extends Model
{
    use HasFactory, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'kelompok_mapel_id',
        'nama',
        'singkatan',
        'urutan'
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
            'urutan' => 'integer'
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'singkatan' => $this->singkatan,
        ];
    }

    public function kelompokMapel(): BelongsTo
    {
        return $this->belongsTo(KelompokMapel::class);
    }

    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class, 'pembelajarans', 'mapel_id', 'kelas_id');
    }

    public function guru(): BelongsToMany
    {
        return $this->belongsToMany(Guru::class, 'pembelajarans', 'mapel_id', 'guru_id');
    }

    public function getPembelajaran()
    {
        $pembelajaran = Pembelajaran::query()
            ->where('mapel_id', $this->id)
            ->whereHas('kelas', fn($q) => $q->where('tapel_id', tapelAktif()))
            ->get();
        return $pembelajaran->map(function ($pembelajaran) {
            return [
                'id' => $pembelajaran->id,
                'guru' => ['id' => $pembelajaran->guru_id, 'nama' => $pembelajaran->guru->nama],
                'kelas' => ['id' => $pembelajaran->kelas_id, 'nama' => $pembelajaran->kelas->nama],
            ];
        });
    }

}
