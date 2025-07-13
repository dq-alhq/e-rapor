<?php

namespace Database\Factories;

use App\Models\Guru;
use App\Models\Proyek;
use App\Models\Subelemen;
use App\Models\Tapel;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProyekFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Proyek::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $tema = [
            'Gaya Hidup Berkelanjutan',
            'Kearifan Lokal',
            'Bhineka Tunggal Ika',
            'Bangunlah Jiwa dan Raganya',
            'Suara Demokrasi',
            'Berekayasa dan Berteknologi untuk Membangun NKRI',
            'Kewirausahaan',
            'Kebekerjaan',
            'Budaya Kerja'
        ];
        return [
            'tapel_id' => Tapel::query()->inRandomOrder()->first('id'),
            'koordinator_id' => Guru::query()->inRandomOrder()->first()->id,
            'tema' => $tema = fake()->randomElement($tema),
            'nama' => "Proyek {$tema}",
            'deskripsi' => fake()->sentence(),
            'elemen' => Subelemen::query()->inRandomOrder()->take(3)->pluck('id')->toArray(),
        ];
    }
}
