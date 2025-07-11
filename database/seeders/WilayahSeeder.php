<?php

namespace Database\Seeders;

use App\Models\Province;
use App\Models\Regency;
use App\Models\Village;
use App\Models\Wilayah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WilayahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode(file_get_contents(storage_path('app/wilayah.json')), true);

        $chunks = array_chunk($data, 1000);
        foreach ($chunks as $key => $chunk) {
            echo "Memulai proses seed data wilayah... ke " . $key + 1 . "000\n";
            Wilayah::query()->insert($chunk);
            echo "Done seed data wilayah... ke " . $key + 1 . "000\n";
        }
    }
}
