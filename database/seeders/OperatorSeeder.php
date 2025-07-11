<?php

namespace Database\Seeders;

use App\Models\Operator;
use App\Models\User;
use Illuminate\Database\Seeder;

class OperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Operator::factory()->create([
            'nama' => $nama = 'Moh. Arif Firdian, S.Pd.',
            'user_id' => User::factory()->create([
                'name' => $nama,
                'username' => $username = str($nama)->slug('.'),
                'email' => "{$username}@gmail.com",
            ])->id,
            'jk' => 'l',
            'nik' => '3525120303010001',
            'tempat_lahir' => 'Gresik',
            'tanggal_lahir' => '2021-03-03',
            'telepon' => '0857-3175-5733',
            'alamat' => 'Dsn. Masangan Tengah RT.002 RW.002',
            'wilayah_id' => 3525122007,
        ]);
    }
}
