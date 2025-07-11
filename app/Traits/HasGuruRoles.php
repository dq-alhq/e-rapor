<?php

namespace App\Traits;

use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Sekolah;

/* @mixin \App\Models\Guru */
trait HasGuruRoles
{
    public function isKepsek(): bool
    {
        return $this->id == Sekolah::query()->first()->kepsek_id;
    }

    public function isWaliKelas(Kelas $kelas): bool
    {
        return $this->id == $kelas->wali_id;
    }

    public function isMengajarMapel(Mapel $mapel): bool
    {
        return $mapel->guru()->where("guru_id", $this->id)->exists();
    }

    public function isMengajarKelas(Kelas $kelas): bool
    {
        return $kelas->guru()->where('guru_id', $this->id)->exists();
    }

    public function isMengajar(Kelas $kelas, Mapel $mapel): bool
    {
        return $this->isMengajarMapel($mapel) && $this->isMengajarKelas($kelas);
    }
}
