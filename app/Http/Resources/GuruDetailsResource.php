<?php

namespace App\Http\Resources;

use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Guru
 */
class GuruDetailsResource extends JsonResource
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
            'jk' => $this->jk,
            'telepon' => $this->telepon,
            'tanggal_lahir' => $this->tanggal_lahir->format('Y-m-d'),
            'tempat_lahir' => $this->tempat_lahir,
            'nik' => $this->nik,
            'nuptk' => $this->nuptk,
            'nip' => $this->nip,
            'wilayah_id' => $this->wilayah_id,
            'alamat' => $this->alamat,
            'alamat_lengkap' => $this->alamat(),
            'avatar' => $this->user->avatar ? route('image', $this->user->avatar) : null,

            'pembelajaran' => $this->mengajar()->groupBy('mapel'),
            'roles' => $this->getRoles(),
            'wali_kelas' => $this->waliKelas(),
            'pembina_ekskul' => $this->pembinaEkskul(),
        ];
    }
}
