<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Sekolah;
use Illuminate\Database\Seeder;

class SekolahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sekolah::query()->create([
            'nama' => "SMP Ma'arif Miftahul Ulum",
            'jenjang' => 'SMP/MTs',
            'npsn' => '20537004',
            'nis' => '200460',
            'nss' => '204050115072',
            'nds' => 'E.01152004',
            'alamat' => 'Jl. Raya Melirang No.29',
            'wilayah_id' => 3525122004,
            'kodepos' => '61152',
            'telepon' => '031-944761',
            'email' => 'spemtalum@gmail.com',
            'kepsek_id' => Guru::factory()->create([
                'nama' => 'Moh. Arif Romadloni, S.Pd.I.',
                'jk' => 'l',
                'nuptk' => '1842760663200032',
                'nik' => '3525121005820001',
                'tempat_lahir' => 'Gresik',
                'tanggal_lahir' => '1982-05-10',
                'telepon' => '0857-3175-5733',
                'alamat' => 'Dsn. Galalo RT.009 RW.004',
                'wilayah_id' => 3525122004,
            ])->id,
        ]);
    }
}
