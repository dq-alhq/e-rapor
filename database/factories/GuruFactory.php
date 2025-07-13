<?php

namespace Database\Factories;

use App\Models\Guru;
use App\Models\Village;
use App\Models\Wilayah;
use Illuminate\Database\Eloquent\Factories\Factory;

class GuruFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Guru::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'jk' => $gender = fake()->randomElement(["l", "p"]),
            'nama' => fake()->unique()->name($gender == "l" ? "male" : "female"),
            'nuptk' => fake()->randomNumber(5, true) . "12345",
            'tanggal_lahir' => $datebirth = fake()->date('Y-m-d', '2000-01-01'),
            'nik' => fake()->nik($gender == "l" ? "male" : "female"),
            'tempat_lahir' => fake()->city(),
            'telepon' => fake()->phoneNumber(),
            'alamat' => fake()->streetAddress(),
            'wilayah_id' => Wilayah::query()->where('name', 'contains', 'Gresik')->first('id'),
        ];
    }
}
