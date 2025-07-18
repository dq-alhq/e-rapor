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
            'alamat' => $this->alamat,
            'wilayah_id' => $this->wilayah_id,
            'alamat_lengkap' => $this->alamat(),
            'kodepos' => $this->kodepos,
            'telepon' => $this->telepon,
            'email' => $this->email,
            'logo' => $this->logo ? route('image', $this->logo) : null,
            'kepsek' => GuruDetailsResource::make($this->kepsek),
        ];
    }
}
