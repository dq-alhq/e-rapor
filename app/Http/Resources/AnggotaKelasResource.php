<?php

namespace App\Http\Resources;

use App\Models\AnggotaKelas;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin AnggotaKelas */
class AnggotaKelasResource extends JsonResource
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
            'siswa' => SiswaResource::make($this->siswa),
            'kelas' => KelasResource::make($this->kelas),
        ];
    }
}
