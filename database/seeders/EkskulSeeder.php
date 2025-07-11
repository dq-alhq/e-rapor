<?php

namespace Database\Seeders;

use App\Models\AnggotaKelas;
use App\Models\Ekskul;
use Illuminate\Database\Seeder;

class EkskulSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ekskuls = [
            "Pramuka",
            "Futsal",
            "Pencak Silat",
            "Kaligrafi",
            "Tahfidzul Qur'an",
            "Al-Banjari",
        ];
        foreach ($ekskuls as $ekskul) {
            Ekskul::factory()->create([
                'nama' => $ekskul,
            ]);
        }

        $createdEkskul = Ekskul::query()->get();

        $siswa = AnggotaKelas::query()->get();

        foreach ($createdEkskul as $ekskul) {
            foreach ($siswa as $s) {
                $ekskul->siswa()->attach($s);
            }
        }
    }
}
