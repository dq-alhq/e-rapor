<?php

namespace Database\Seeders;

use App\Models\Jadwal;
use App\Models\Kelas;
use App\Models\Pembelajaran;
use Illuminate\Database\Seeder;

class JadwalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hari = [
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            'Sabtu',
            'Minggu',
        ];

        $jam = [
            1, 2, 3, 4, 5, 6, 7, 8
        ];

        $kelas = Kelas::query()->get();

        foreach ($hari as $h) {
            foreach ($jam as $j) {
                foreach ($kelas as $k) {
                    Jadwal::create([
                        'tapel_id' => 1,
                        'hari' => $h,
                        'jam' => $j,
                        'pembelajaran_id' => Pembelajaran::where('kelas_id', $k->id)->inRandomOrder()->first()->id
                    ]);
                }
            }
        }
    }
}
