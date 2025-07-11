<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            WilayahSeeder::class,
            GuruSeeder::class,
            OperatorSeeder::class,
            SekolahSeeder::class,
            TapelSeeder::class,
            SiswaSeeder::class,
            MapelSeeder::class,
            EkskulSeeder::class,
            ProyekSeeder::class,
            AnggotaKelasSeeder::class,
            PembelajaranSeeder::class,
            AnggotaEkskulSeeder::class
        ]);
    }
}
