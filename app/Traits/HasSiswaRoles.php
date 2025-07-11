<?php

namespace App\Traits;

use App\Models\Ekskul;
use App\Models\Kelas;

/* @mixin \App\Models\Siswa */
trait HasSiswaRoles
{
    public function isSiswaKelas(Kelas $kelas): bool
    {
        return $kelas->siswa()->where('siswa_id', $this->id)->exists();
    }

    public function isAnggotaEkskul(Ekskul $ekskul): bool
    {
        return $ekskul->siswa()->where('siswa_id', $this->id)->exists();
    }
}
