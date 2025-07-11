<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\AnggotaKela;
use App\Models\CatatanWaliKelas;
use App\Models\Guru;

class CatatanWaliKelasFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CatatanWaliKelas::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'wali_id' => Guru::factory(),
            'anggota_kelas_id' => AnggotaKela::factory(),
            'catatan' => fake()->text(),
        ];
    }
}
