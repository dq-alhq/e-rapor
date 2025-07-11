<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Tapel;

class KelasFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Kelas::class;

    protected function romawi($number): string
    {
        return match ($number) {
            1 => 'I',
            2 => 'II',
            3 => 'III',
            4 => 'IV',
            5 => 'V',
            6 => 'VI',
            7 => 'VII',
            8 => 'VIII',
            9 => 'IX',
            10 => 'X',
            11 => 'XI',
            12 => 'XII',
        };
    }

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {


        return [
            'tapel_id' => Tapel::factory(),
            'wali_id' => Guru::query()->inRandomOrder()->first('id'),
            'tingkat' => $tingkat = fake()->numberBetween(7, 9),
            'nama' => $this->romawi($tingkat)
        ];
    }
}
