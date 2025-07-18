<?php

use App\Http\Controllers;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'dashboard')->name('home');


Route::middleware('auth')->group(function () {
    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return inertia('settings/appearance');
    })->name('appearance');

    Route::middleware('verified')->group(function () {
        Route::get('dashboard', function (Request $request) {
            return inertia('dashboard');
        })->name('dashboard');
    });
});

Route::middleware(['auth', 'operator'])->group(function () {
    Route::inertia('kepsek', 'kepsek')->name('kepsek');
    Route::resource('sekolah', Controllers\Kepsek\SekolahController::class);
    Route::resource('tapel', Controllers\Kepsek\TapelController::class);
    Route::put('tapel/{tapel}/aktif', [Controllers\Kepsek\TapelController::class, 'aktif'])->name('tapel.aktif');
    Route::resource('mapel', Controllers\Kepsek\MapelController::class);

    Route::resource('kelas', Controllers\Kepsek\KelasController::class);
    Route::get('/kelas-siswa/{kelas}', [Controllers\Kepsek\KelasController::class, 'anggota_kelas'])->name('kelas.anggota_kelas');
    Route::put('/kelas-siswa/{kelas}', [Controllers\Kepsek\KelasController::class, 'update_anggota_kelas']);

    Route::get('/pembelajaran/{mapel}/{kelas}', [Controllers\Kepsek\MapelController::class, 'pembelajaran'])->name('pembelajaran.mapel');
    Route::put('/pembelajaran/{mapel}/{kelas}', [Controllers\Kepsek\MapelController::class, 'updatePembelajaran']);
    Route::get('/pembelajaran/{kelas}', [Controllers\Kepsek\PembelajaranController::class, 'createByKelas'])->name('pembelajaran.kelas');
    Route::put('/pembelajaran/{kelas}', [Controllers\Kepsek\PembelajaranController::class, 'updateByKelas']);

    Route::resource('ekskul', Controllers\Kepsek\EkskulController::class);
    Route::get('ekskul-siswa/{ekskul}', [Controllers\Kepsek\EkskulController::class, 'anggota_ekskul'])->name('ekskul.anggota_ekskul');
    Route::put('ekskul-siswa/{ekskul}', [Controllers\Kepsek\EkskulController::class, 'update_anggota_ekskul']);

    Route::resource('siswa', Controllers\Kepsek\SiswaController::class);
    Route::resource('guru', Controllers\Kepsek\GuruController::class);
    Route::resource('operator', Controllers\Kepsek\OperatorController::class);
    Route::resource('proyek', Controllers\Kepsek\ProyekController::class);
    Route::resource('penilaian', Controllers\Kepsek\PenilaianController::class);
});

Route::get('cek-session', function (Request $request) {
    return session()->all();
});

Route::middleware('guru')->prefix('guru')->group(function () {
    Route::inertia('guru', 'guru')->name('guru');
});

Route::middleware('siswa')->prefix('siswa')->group(function () {
    Route::inertia('siswa', 'siswa')->name('siswa');
});

Route::middleware('operator')->prefix('operator')->group(function () {
    Route::inertia('operator', 'operator')->name('operator');
});

Route::middleware('wali-kelas')->prefix('wali-kelas')->group(function () {
    Route::inertia('wali-kelas', 'wali-kelas')->name('wali-kelas');
});

Route::middleware('pembina-ekskul')->prefix('pembina-ekskul')->group(function () {
    Route::inertia('pembina-ekskul', 'pembina-ekskul')->name('pembina-ekskul');
});

Route::middleware('koor-proyek')->prefix('koor-proyek')->group(function () {
    Route::inertia('koor-proyek', 'koor-proyek')->name('koor-proyek');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/dev.php';
