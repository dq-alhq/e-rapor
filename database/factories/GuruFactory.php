<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Guru;
use App\Models\User;
use App\Models\Village;
use App\Models\Wilayah;

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
            'jk' =>  $gender = fake()->randomElement(["l", "p"]),
            'nama' => $name = fake()->name($gender == "l" ? "male" : "female"),
            'user_id' => User::factory()->create([
                'name' => $name,
                'username' => $username = str($name)->slug(),
                'email' => "{$username}@gmail.com",
            ]),
            'nuptk' => fake()->randomNumber(5, true) . "12345",
            'nik' => "352512" . fake()->randomNumber(6, true) . "0001",
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->date('Y-m-d', '2000-01-01'),
            'telepon' => fake()->phoneNumber(),
            'alamat' => fake()->streetAddress(),
            'wilayah_id' => Wilayah::query()->where('name', 'contains', 'Gresik')->first('id'),
        ];
    }
}
