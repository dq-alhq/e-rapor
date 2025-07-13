<?php

namespace App\Traits;

use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Sekolah;
use App\Models\User;

/* @mixin User */
trait HasUserRoles
{
    public function isKepsek(): bool
    {
        return $this->id === Sekolah::query()->first()->kepsek->user_id;
    }

    public function isOperator(): bool
    {
        return $this->operator()->exists();
    }

    public function isSiswa(): bool
    {
        return $this->siswa()->exists();
    }

    public function isGuru(): bool
    {
        return $this->guru()->exists();
    }

    public function isWaliKelas(Kelas $kelas): bool
    {
        return $this->isGuru() && $this->id == $kelas->wali->user_id;
    }

    public function isMengajarMapel(Mapel $mapel): bool
    {
        return $this->isGuru() && $mapel->guru()->where("guru_id", $this->guru->id)->exists();
    }

    public function isMengajarKelas(Kelas $kelas): bool
    {
        return $this->isGuru() && $kelas->guru()->where('guru_id', $this->guru->id)->exists();
    }

    public function isMengajar(Kelas $kelas, Mapel $mapel): bool
    {
        return $this->isGuru() && $this->isMengajarMapel($mapel) && $this->isMengajarKelas($kelas);
    }

    public function isSiswaKelas(Kelas $kelas): bool
    {
        return $this->id == $kelas->siswa()->first()->id;
    }

    public function getRoles(): array
    {
        $roles = [];
        if ($this->isKepsek()) $roles[] = "Kepala Sekolah";
        if ($this->isOperator()) $roles[] = "Operator";
        if ($this->isGuru()) $roles[] = "Guru";
        if ($this->isSiswa()) $roles[] = "Siswa";
        return $roles;
    }
}
