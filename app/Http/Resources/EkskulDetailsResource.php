<?php

namespace App\Http\Resources;

use App\Models\Ekskul;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Ekskul
 */
class EkskulDetailsResource extends JsonResource
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
            'guru' => [
                'id' => $this->guru->id,
                'nama' => $this->guru->nama
            ],
            'nama' => $this->nama,
            'deskripsi' => $this->deskripsi,
            'siswa' => $this->anggota_kelas()->get()->map(function ($anggota) {
                return [
                    'id' => $anggota->siswa->id,
                    'nama' => $anggota->siswa->nama,
                    'kelas_sekarang' => $anggota->siswa->kelasSekarang()->nama
                ];
            }),
        ];
    }
}
