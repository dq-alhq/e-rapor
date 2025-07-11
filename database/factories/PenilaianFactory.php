<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Pembelajaran;
use App\Models\Penilaian;

class PenilaianFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Penilaian::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'pembelajaran_id' => Pembelajaran::factory(),
            'nama' => fake()->word(),
            'materi' => fake()->word(),
            'tujuan_pembelajaran' => '{}',
        ];
    }
}
