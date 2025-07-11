<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sekolah extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nama',
        'jenjang',
        'npsn',
        'nis',
        'nss',
        'nds',
        'alamat',
        'wilayah_id',
        'kodepos',
        'telepon',
        'email',
        'kepsek_id',
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
            'village_id' => 'integer',
            'kepsek_id' => 'integer',
        ];
    }

    public function wilayah(): BelongsTo
    {
        return $this->belongsTo(Wilayah::class);
    }

    public function kepsek(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }
}
