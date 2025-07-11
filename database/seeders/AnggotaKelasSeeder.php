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
        $kelas7 = Kelas::query()->where('tingkat', 7)->get();
        foreach ($kelas7 as $kelas) {
            foreach ($siswaKelas7A as $siswa) {
                $siswa->kelas()->attach($kelas->id);
            }
            foreach ($siswaKelas7B as $siswa) {
                $siswa->kelas()->attach($kelas->id);
            }
        }

        $jml8 = Siswa::query()->where('tahun_masuk', 2024)->count();
        $siswaKelas8A = Siswa::query()->where('tahun_masuk', 2024)->skip(0)->take(round($jml8 / 2))->get();
        $siswaKelas8B = Siswa::query()->where('tahun_masuk', 2024)->skip(round($jml8 / 2))->take(round($jml8 / 2))->get();
        $kelas8 = Kelas::query()->where('tingkat', 8)->get();
        foreach ($kelas8 as $kelas) {
            foreach ($siswaKelas8A as $siswa) {
                $siswa->kelas()->attach($kelas->id);
            }
            foreach ($siswaKelas8B as $siswa) {
                $siswa->kelas()->attach($kelas->id);
            }
        }

        $jml8 = Siswa::query()->where('tahun_masuk', 2023)->count();
        $siswaKelas8A = Siswa::query()->where('tahun_masuk', 2023)->skip(0)->take(round($jml8 / 2))->get();
        $siswaKelas8B = Siswa::query()->where('tahun_masuk', 2023)->skip(round($jml8 / 2))->take(round($jml8 / 2))->get();
        $kelas8 = Kelas::query()->where('tingkat', 8)->get();
        foreach ($kelas8 as $kelas) {
            foreach ($siswaKelas8A as $siswa) {
                $siswa->kelas()->attach($kelas->id);
            }
            foreach ($siswaKelas8B as $siswa) {
                $siswa->kelas()->attach($kelas->id);
            }
        }


    }
}
