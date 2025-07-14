<?php

namespace App\Http\Resources;

use App\Models\Tapel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Tapel */
class TapelResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'aktif' => $this->isAktif(),
            'tahun' => $this->tahun,
            'semester' => $this->semester,
            'tempat_rapor' => $this->tempat_rapor,
            'tanggal_rapor' => $this->tanggal_rapor?->format('Y-m-d'),
            'kelas_count' => $this->kelas_count,
            'proyeks_count' => $this->proyeks_count,
            'siswa_count' => $this->siswa()->count(),
        ];
    }
}
