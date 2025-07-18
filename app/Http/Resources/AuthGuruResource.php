<?php

namespace App\Http\Resources;

use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Guru
 */
class AuthGuruResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'mapel' => $this->daftarMapel(),
            'kelas' => $this->daftarKelas(),
            'wali_kelas' => $this->waliKelas(),
            'pembina_ekskul' => $this->pembinaEkskul(),
        ];
    }
}
