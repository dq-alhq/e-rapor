<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Guru extends Model
{
    use HasFactory;

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

    public function mapels(): BelongsToMany
    {
        return $this->belongsToMany(Mapel::class)
            ->using(Pembelajaran::class)
            ->as('pembelajaran')
            ->withPivot('id', 'kelas_id', 'mapel_id', 'guru_id', 'kkm')
            ->withTimestamps();
    }

    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class)
            ->using(Pembelajaran::class)
            ->as('pembelajaran')
            ->withPivot('id', 'kelas_id', 'mapel_id', 'guru_id', 'kkm')
            ->withTimestamps();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function wilayah(): BelongsTo
    {
        return $this->belongsTo(Wilayah::class);
    }
}
