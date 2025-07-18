<?php

namespace App\Http\Resources;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Kelas
 */
class KelasDetailsResource extends JsonResource
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
            'nama' => $this->nama,
            'tingkat' => $this->tingkat,
            'wali' => [
                'id' => $this->wali->id,
                'nama' => $this->wali->nama
            ],
            'siswa' => $this->siswa()->get()->map(fn($siswa) => SiswaResource::make($siswa)),
        ];
    }
}
