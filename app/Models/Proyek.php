<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Proyek extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tapel_id',
        'tema',
        'nama',
        'deskripsi',
        'elemen',
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
            'elemen' => 'array',
        ];
    }

    public function tapel(): BelongsTo
    {
        return $this->belongsTo(Tapel::class);
    }

    public function siswa(): BelongsToMany
    {
        return $this->belongsToMany(Siswa::class, 'anggota_proyeks', 'proyek_id', 'siswa_id');
    }
}
