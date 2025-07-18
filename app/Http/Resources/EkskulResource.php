<?php

namespace App\Http\Resources;

use App\Models\Ekskul;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Ekskul
 */
class EkskulResource extends JsonResource
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
            'siswa_count' => $this->anggota_kelas()->count(),
        ];
    }
}
