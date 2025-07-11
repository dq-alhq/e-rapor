<?php

namespace Database\Seeders;

use App\Models\AnggotaKelas;
use App\Models\Ekskul;
use Illuminate\Database\Seeder;

class AnggotaEkskulSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ekskul = Ekskul::query()->get();

        foreach ($ekskul as $e) {
            $anggotaKelas = AnggotaKelas::query()->inRandomOrder()->take(3)->get();
            $e->siswa()->sync($anggotaKelas);
        }
    }
}
