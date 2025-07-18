<?php

namespace App\Http\Resources;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Siswa
 */
class SiswaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nis' => $this->nis,
            'nama' => $this->nama,
            'kelas_sekarang' => $this->kelasSekarang()->nama ?? null,
            'tahun_masuk' => $this->tahun_masuk,
            'avatar' => $this->user->avatar ? route('image', $this->user->avatar) : null,
        ];
    }
}
