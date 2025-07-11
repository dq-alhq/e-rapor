<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Siswa;
use App\Models\User;
use App\Models\Village;
use App\Models\Wilayah;

class SiswaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Siswa::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $pekerjaan_ayah = [
            'Pegawai Negeri',
            'Pegawai Swasta',
            'Wiraswasta',
            'Buruh',
            'Lainnya',
        ];
        $pekerjaan_ibu = [...$pekerjaan_ayah, 'Mengurus Rumah Tangga'];

        return [
            'jk' => $gender = fake()->randomElement(["l", "p"]),
            'nama' => $nama = fake()->name($gender == 'l' ? 'male' : 'female'),
            'user_id' => User::factory()->create([
                'name' => $nama,
                'username' => $username = str($nama)->slug('.'),
                'email' => "{$username}@gmail.com",
            ]),
            'nis' => fake()->unique()->randomNumber(5),
            'nisn' => "00" . fake()->unique()->randomNumber(8),
            'nik' => "352512" . fake()->randomNumber(6, true) . "0001",
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->date('Y-m-d', '2010-01-01'),
            'telepon' => fake()->phoneNumber(),
            'alamat' => fake()->streetAddress(),
            'wilayah_id' => Wilayah::query()->where('name', 'contains', 'Gresik')->first('id'),
            'status_dalam_keluarga' => 1,
            'anak_ke' => fake()->numberBetween(1, 5),
            'asal_sekolah' => fake()->company(),
            'tahun_masuk' => fake()->numberBetween(2023, 2025),
            'nama_ayah' => $n_ayah = fake()->name('male'),
            'pekerjaan_ayah' => $p_ayah = fake()->randomElement($pekerjaan_ayah),
            'nama_ibu' => fake()->name('female'),
            'pekerjaan_ibu' => fake()->randomElement($pekerjaan_ibu),
            'nama_wali' => $n_ayah,
            'pekerjaan_wali' => $p_ayah,
            'telepon_wali' => fake()->phoneNumber(),
        ];
    }
}
