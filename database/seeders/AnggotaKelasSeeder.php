<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnggotaKelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $siswaKelas7 = Siswa::query()->where('tahun_masuk', 2025)->get();
        $kelas7 = Kelas::query()->where('tingkat', 7)->get();
        foreach ($siswaKelas7 as $siswa) {
            foreach ($kelas7 as $kelas) {
                $siswa->kelas()->attach($kelas->id);
            }
        }

        $siswaKelas8 = Siswa::query()->where('tahun_masuk', 2024)->get();
        $kelas8 = Kelas::query()->where('tingkat', 8)->get();
        foreach ($siswaKelas8 as $siswa) {
            foreach ($kelas8 as $kelas) {
                $siswa->kelas()->attach($kelas->id);
            }
        }

        $siswaKelas9 = Siswa::query()->where('tahun_masuk', 2023)->get();
        $kelas9 = Kelas::query()->where('tingkat', 9)->get();
        foreach ($siswaKelas9 as $siswa) {
            foreach ($kelas9 as $kelas) {
                $siswa->kelas()->attach($kelas->id);
            }
        }
    }
}
