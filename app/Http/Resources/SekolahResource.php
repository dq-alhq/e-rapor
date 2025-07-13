<?php

namespace App\Http\Resources;

use App\Models\Sekolah;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Sekolah */
class SekolahResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nama' => $this->nama,
            'jenjang' => $this->jenjang,
            'npsn' => $this->npsn,
            'nis' => $this->nis,
            'nss' => $this->nss,
            'nds' => $this->nds,
            'alamat' => "{$this->alamat}, {$this->wilayah->name}",
            'kodepos' => $this->kodepos,
            'telepon' => $this->telepon,
            'email' => $this->email,
            'kepsek_id' => $this->kepsek->nama,
        ];
    }
}
