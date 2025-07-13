<?php

namespace App\Http\Resources;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Siswa
 */
class SiswaDetailsResource extends JsonResource
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
            'nisn' => $this->nisn,
            'nis' => $this->nis,
            'wilayah_id' => $this->wilayah_id,
            'alamat' => $this->alamat,
            'alamat_lengkap' => $this->alamat(),
            'avatar' => $this->user->avatar ? route('image', $this->user->avatar) : null,

            'status_dalam_keluarga' => $this->statusDalamKeluarga(),
            'anak_ke' => $this->anak_ke,

            'nama_ayah' => $this->nama_ayah,
            'pekerjaan_ayah' => $this->pekerjaan_ayah,
            'nama_ibu' => $this->nama_ibu,
            'pekerjaan_ibu' => $this->pekerjaan_ibu,
            'nama_wali' => $this->nama_wali == $this->nama_ayah ? $this->nama_ayah . ' (Ayah)' : $this->nama_wali,
            'pekerjaan_wali' => $this->pekerjaan_wali,
            'telepon_wali' => $this->telepon_wali,
        ];
    }
}
