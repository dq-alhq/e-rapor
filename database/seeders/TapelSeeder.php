<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\Tapel;
use Illuminate\Database\Seeder;

class TapelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'tahun' => 2023,
                'semester' => "1",
                'tempat_rapor' => 'Melirang',
                'aktif' => true
            ],
            [
                'tahun' => 2023,
                'semester' => "2",
                'tempat_rapor' => 'Melirang',
            ]
        ])->each(fn($tapel) => Tapel::query()->create($tapel));

        $tapels = Tapel::query()->get();

        foreach ($tapels as $tapel) {
            collect([
                [
                    'tapel_id' => $tapel->id,
                    'tingkat' => 7,
                    'nama' => "VII-A"
                ],
                [
                    'tapel_id' => $tapel->id,
                    'tingkat' => 7,
                    'nama' => "VII-B"
                ],
                [
                    'tapel_id' => $tapel->id,
                    'tingkat' => 8,
                    'nama' => "VIII-A"
                ],
                [
                    'tapel_id' => $tapel->id,
                    'tingkat' => 8,
                    'nama' => "VIII-B"
                ],
                [
                    'tapel_id' => $tapel->id,
                    'tingkat' => 9,
                    'nama' => "IX-A"
                ],
                [
                    'tapel_id' => $tapel->id,
                    'tingkat' => 9,
                    'nama' => "IX-B"
                ]
            ])->each(fn($k) => Kelas::factory()->create($k));
        }
    }
}
