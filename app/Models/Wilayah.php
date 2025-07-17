<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Wilayah extends Model
{
    use Searchable;
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
    public function sekolah(): HasMany
    {
        return $this->hasMany(Sekolah::class);
    }

    public function guru(): HasMany
    {
        return $this->hasMany(Guru::class);
    }

    public function siswa(): HasMany
    {
        return $this->hasMany(Siswa::class);
    }

    public function operator(): HasMany
    {
        return $this->hasMany(Operator::class);
    }
}
