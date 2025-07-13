<?php

namespace App\Http\Resources;

use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Guru
 */
class GuruResource extends JsonResource
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
            'mapel' => $this->mengajarMapel(),
            'avatar' => $this->user->avatar ? route('image', $this->user->avatar) : null,
        ];
    }
}
