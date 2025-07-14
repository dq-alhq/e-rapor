<?php

namespace App\Traits;

use App\Models\Ekskul;
use App\Models\Kelas;
use App\Models\Proyek;
use App\Models\Siswa;

/* @mixin Siswa */
trait HasSiswaRoles
{
    public function kelasSekarang(): ?Kelas
    {
        return $this->kelas()->where('tapel_id', tapelAktif())->first();
    }

    public function isAnggotaKelas(Kelas $kelas): bool
    {
        return $kelas->siswa()->where('siswa_id', $this->id)->exists();
    }

    public function isAnggotaEkskul(Ekskul $ekskul): bool
    {
        return $ekskul->siswa()->where('siswa_id', $this->id)->exists();
    }

    public function isAnggotaProyek(Proyek $proyek): bool
    {
        return $proyek->siswa()->where('siswa_id', $this->id)->exists();
    }
}
