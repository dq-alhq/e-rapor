<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Pembelajaran;
use Illuminate\Database\Seeder;

class PembelajaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kelas = Kelas::query()->get();
        $mapel = Mapel::query()->get();
        $kkm = 75;

        foreach ($kelas as $k) {
            foreach ($mapel as $m) {
                Pembelajaran::query()->create([
                    'guru_id' => Guru::query()->inRandomOrder()->first()->id,
                    'kelas_id' => $k->id,
                    'mapel_id' => $m->id,
                    'kkm' => $kkm,
                ]);
            }
        }
    }
}
