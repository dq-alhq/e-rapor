<?php

namespace App\Traits;

use App\Models\Ekskul;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Pembelajaran;
use App\Models\Sekolah;

/* @mixin Guru */
trait HasGuruRoles
{
    public function isKepsek(): bool
    {
        return $this->id == Sekolah::query()->first()->kepsek_id;
    }

    public function waliKelas(): object
    {
        $kelas = Kelas::query()
            ->where('wali_id', $this->id)
            ->where('tapel_id', tapelAktif())
            ->get();
        return $kelas->map(function ($kelas) {
            return [
                'id' => $kelas->id,
                'nama' => $kelas->nama,
                'tingkat' => $kelas->tingkat,
            ];
        });
    }

    public function isWaliKelas(Kelas $kelas): bool
    {
        return $this->id == $kelas->wali_id;
    }

    public function mengajarMapel(): object
    {
        $mapel = Mapel::query()
            ->whereHas('guru', fn($q) => $q->where('guru_id', $this->id))
            ->get();
        return $mapel->map(function ($mapel) {
            return [
                'id' => $mapel->id,
                'nama' => $mapel->nama,
                'singkatan' => $mapel->singkatan
            ];
        });
    }

    public function isMengajarMapel(Mapel $mapel): bool
    {
        return $mapel->guru()->where("guru_id", $this->id)->exists();
    }

    public function mengajarKelas(): object
    {
        $kelas = Kelas::query()
            ->whereHas('guru', fn($q) => $q->where('guru_id', $this->id))
            ->where('tapel_id', tapelAktif())
            ->get();
        return $kelas->map(function ($kelas) {
            return [
                'id' => $kelas->id,
                'nama' => $kelas->nama,
                'tingkat' => $kelas->tingkat,
            ];
        });
    }

    public function isMengajarKelas(Kelas $kelas): bool
    {
        return $kelas->guru()->where('guru_id', $this->id)->exists();
    }

    public function mengajar(): object
    {
        $pembelajaran = Pembelajaran::query()
            ->where('guru_id', $this->id)
            ->whereHas('kelas', fn($q) => $q->where('tapel_id', tapelAktif()))
            ->get();
        return $pembelajaran->map(function ($pembelajaran) {
            return [
                'id' => $pembelajaran->id,
                'mapel' => $pembelajaran->mapel->nama,
                'kelas' => $pembelajaran->kelas->nama,
            ];
        });
    }

    public function isMengajar(Mapel $mapel, Kelas $kelas): bool
    {
        return $this->isMengajarMapel($mapel) && $this->isMengajarKelas($kelas);
    }

    public function pembinaEkskul(): object
    {
        $ekskul = $this->ekskul()->get();
        return $ekskul->map(function ($ekskul) {
            return [
                'id' => $ekskul->id,
                'nama' => $ekskul->nama,
            ];
        });
    }

    public function isPembinaEkskul(Ekskul $ekskul): bool
    {
        return $this->id == $ekskul->guru->id;
    }

    public function getRoles(): array
    {
        $roles = [];
        if ($this->isKepsek()) $roles[] = 'Kepala Sekolah';
        if ($this->pembinaEkskul()) {
            $pembina = $this->pembinaEkskul()->map(function ($ekskul) {
                return 'Pembina ' . $ekskul['nama'];
            });
            $roles = array_merge($roles, $pembina->toArray());
        }
        if ($this->waliKelas()) {
            $wali = $this->waliKelas()->map(function ($kelas) {
                return 'Wali Kelas ' . $kelas['nama'];
            });
            $roles = array_merge($roles, $wali->toArray());
        }
        return $roles;
    }
}
