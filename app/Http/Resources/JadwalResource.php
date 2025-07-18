<?php

namespace App\Http\Resources;

use App\Models\Jadwal;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Jadwal
 */
class JadwalResource extends JsonResource
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
            'jam' => $this->jam,
            'hari' => $this->hari,
            'pembelajaran' => $this->pembelajaran ? [
                'id' => $this->pembelajaran_id,
                'kelas' => $this->pembelajaran->kelas->nama,
                'mapel' => $this->pembelajaran->mapel->nama,
                'guru' => [
                    'id' => $this->pembelajaran->guru_id,
                    'nama' => $this->pembelajaran->guru->nama,
                ],
            ] : null
        ];
    }
}
