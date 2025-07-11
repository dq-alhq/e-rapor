<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Tapel;

class TapelFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Tapel::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'tahun' => fake()->numberBetween(2022, 2030),
            'semester' => fake()->randomElement(["1", "2"]),
            'tempat_rapor' => fake()->city(),
            'tanggal_rapor' => fake()->date(),
        ];
    }
}
