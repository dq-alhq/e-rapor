<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class KelompokMapel extends Model
{
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
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
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
        ];
    }

    public function mapel(): HasMany
    {
        return $this->hasMany(Mapel::class);
    }
}
