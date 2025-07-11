<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Ekskul;
use App\Models\Guru;

class EkskulFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ekskul::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'guru_id' => Guru::query()->inRandomOrder()->first('id'),
            'nama' => fake()->word(),
            'deskripsi' => fake()->sentence(),
        ];
    }
}
