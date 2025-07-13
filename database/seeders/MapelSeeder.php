<?php

namespace Database\Seeders;

use App\Models\KelompokMapel;
use Illuminate\Database\Seeder;

class MapelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KelompokMapel::query()->create([
            'nama' => 'Pendidikan Agama',
        ])->mapel()->createMany([
            ['nama' => 'Pendidkan Agama Islam', 'singkatan' => 'PAI'],
            ['nama' => 'Aqidah Akhlaq', 'singkatan' => 'AQA'],
            ['nama' => 'Quran Hadits', 'singkatan' => 'QRH'],
            ['nama' => 'Fiqih', 'singkatan' => 'FQH'],
            ['nama' => 'Sejarah Kebudayaan Islam', 'singkatan' => 'SKI'],
            ['nama' => 'Bahasa Arab', 'singkatan' => 'BAR'],
            ['nama' => 'Aswaja', 'singkatan' => 'AWJ'],
            ['nama' => 'Pembiasaan', 'singkatan' => 'PBS'],
        ]);

        KelompokMapel::query()->create([
            'nama' => 'Umum',
        ])->mapel()->createMany([
            ['nama' => 'Pendidikan Pancasila', 'singkatan' => 'PKN'],
            ['nama' => 'Matematika', 'singkatan' => 'MTK'],
            ['nama' => 'Ilmu Pengetahuan Alam', 'singkatan' => 'IPA'],
            ['nama' => 'Ilmu Pengetahuan Sosial', 'singkatan' => 'IPS'],
            ['nama' => 'Bahasa Indonesia', 'singkatan' => 'BIN'],
            ['nama' => 'Bahasa Inggris', 'singkatan' => 'BIG'],
            ['nama' => 'Pendidikan Jasmani & Orkes', 'singkatan' => 'PJK'],
            ['nama' => 'Prakarya', 'singkatan' => 'PRK'],
            ['nama' => 'Seni', 'singkatan' => 'SBK'],
        ]);

        KelompokMapel::query()->create([
            'nama' => 'Muatan Lokal',
        ])->mapel()->createMany([
            ['nama' => 'Bahasa Daerah', 'singkatan' => 'BDR'],
            ['nama' => 'Pendidikan Lingkungan Hidup', 'singkatan' => 'PLH'],
        ]);
    }
}
