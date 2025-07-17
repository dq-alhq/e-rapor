<?php

namespace App\Models;

use App\Observers\GuruObserver;
use App\Traits\HasGuruRoles;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

#[ObservedBy([GuruObserver::class])]
class Guru extends Model
{
    use HasFactory, HasGuruRoles, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'nama',
        'jk',
        'nip',
        'nuptk',
        'nik',
        'tempat_lahir',
        'tanggal_lahir',
        'telepon',
        'alamat',
        'wilayah_id',
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
            'wilayah_id' => 'integer',
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'nip' => $this->nip,
            'nuptk' => $this->nuptk,
            'nik' => $this->nik
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mapel(): BelongsToMany
    {
        return $this->belongsToMany(Mapel::class, 'pembelajarans', 'guru_id', 'mapel_id');
    }

    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class, 'pembelajarans', 'guru_id', 'kelas_id');
    }

    public function pembelajaran(): HasMany
    {
        return $this->hasMany(Pembelajaran::class);
    }

    public function ekskul(): HasMany
    {
        return $this->hasMany(Ekskul::class);
    }

    public function wilayah(): BelongsTo
    {
        return $this->belongsTo(Wilayah::class);
    }

    public function alamat(): string
    {
        return $this->wilayah ? $this->alamat . ', ' . $this->wilayah->name : $this->alamat;
    }
}
