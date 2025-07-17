<?php

namespace App\Http\Resources;

use App\Models\Mapel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Mapel
 */
class MapelResource extends JsonResource
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
            'kelompok_mapel' => [
                'id' => $this->kelompok_mapel_id,
                'nama' => $this->kelompokMapel->nama
            ],
            'nama' => $this->nama,
            'singkatan' => $this->singkatan,
            'guru_count' => $this->guru_count,
        ];
    }
}
