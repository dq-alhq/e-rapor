<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */
class AuthUserResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'avatar' => $this->avatar ? route('image', $this->avatar) : null,
            'roles' => $this->getRoles(),
            'guru' => $this->guru ? AuthGuruResource::make($this->guru) : null,
            'siswa' => $this->siswa ? AuthSiswaResource::make($this->siswa) : null
        ];
    }
}
