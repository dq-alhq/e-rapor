<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Database\Seeder;

class AnggotaKelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jml7 = Siswa::query()->where('tahun_masuk', 2025)->count();
        $siswaKelas7A = Siswa::query()->where('tahun_masuk', 2025)->skip(0)->take(round($jml7 / 2))->get();
        $siswaKelas7B = Siswa::query()->where('tahun_masuk', 2025)->skip(round($jml7 / 2))->take(round($jml7 / 2))->get();
        foreach ($siswaKelas7A as $siswa) {
            $siswa->kelas()->attach(Kelas::query()->where('nama', 'VII-A')->get());
        }
        foreach ($siswaKelas7B as $siswa) {
            $siswa->kelas()->attach(Kelas::query()->where('nama', 'VII-B')->get());
        }

        $jml8 = Siswa::query()->where('tahun_masuk', 2024)->count();
        $siswaKelas8A = Siswa::query()->where('tahun_masuk', 2024)->skip(0)->take(round($jml8 / 2))->get();
        $siswaKelas8B = Siswa::query()->where('tahun_masuk', 2024)->skip(round($jml8 / 2))->take(round($jml8 / 2))->get();
        foreach ($siswaKelas8A as $siswa) {
            $siswa->kelas()->attach(Kelas::query()->where('nama', 'VIII-A')->get());
        }
        foreach ($siswaKelas8B as $siswa) {
            $siswa->kelas()->attach(Kelas::query()->where('nama', 'VIII-B')->get());
        }

        $jml9 = Siswa::query()->where('tahun_masuk', 2023)->count();
        $siswaKelas9A = Siswa::query()->where('tahun_masuk', 2023)->skip(0)->take(round($jml9 / 2))->get();
        $siswaKelas9B = Siswa::query()->where('tahun_masuk', 2023)->skip(round($jml9 / 2))->take(round($jml9 / 2))->get();
        foreach ($siswaKelas9A as $siswa) {
            $siswa->kelas()->attach(Kelas::query()->where('nama', 'IX-A')->get());
        }
        foreach ($siswaKelas9B as $siswa) {
            $siswa->kelas()->attach(Kelas::query()->where('nama', 'IX-B')->get());
        }


    }
}
