<?php

namespace Database\Factories;

use App\Models\Operator;
use App\Models\User;
use App\Models\Village;
use App\Models\Wilayah;
use Illuminate\Database\Eloquent\Factories\Factory;

class OperatorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Operator::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'jk' => $gender = fake()->randomElement(["l", "p"]),
            'nama' => $nama = fake()->unique()->name($gender == "l" ? "male" : "female"),
            'user_id' => User::factory()->create([
                'name' => $name = removeGelar($nama),
                'username' => $username = str($name)->slug(),
                'email' => "{$username}@gmail.com",
            ]),
            'nuptk' => fake()->randomNumber(5, true) . "12345",
            'nik' => fake()->nik($gender == "l" ? "male" : "female"),
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->date('Y-m-d', '2000-01-01'),
            'telepon' => fake()->phoneNumber(),
            'alamat' => fake()->streetAddress(),
            'wilayah_id' => Wilayah::query()->where('name', 'contains', 'Gresik')->first('id'),
        ];
    }
}
