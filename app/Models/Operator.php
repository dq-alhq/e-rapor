<?php

namespace App\Models;

use App\Observers\OperatorObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ObservedBy([OperatorObserver::class])]
class Operator extends Model
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
        'nik',
        'nuptk',
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function wilayah(): BelongsTo
    {
        return $this->belongsTo(Wilayah::class);
    }

    public function alamat(): string
    {
        return $this->alamat . ', ' . $this->wilayah->nama;
    }
}
