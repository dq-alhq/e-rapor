<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/** @mixin \App\Models\Tapel */
class TapelResource extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tahun' => $this->tahun,
            'semester' => $this->semester,
            ''
        ];
    }
}
