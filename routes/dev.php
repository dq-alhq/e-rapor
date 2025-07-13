<?php

use Illuminate\Support\Facades\Route;

if (!app()->isProduction()) {
    Route::get('login/{role}', function (string $role) {
        switch ($role) {
            case 'kepsek':
                $id = \App\Models\Sekolah::query()->first()->kepsek->user_id;
                break;
            case 'guru':
                $id = \App\Models\Guru::query()->first()->user_id;
                break;
            case 'operator':
                $id = \App\Models\Operator::query()->first()->user_id;
                break;
            case 'wali-kelas':
                $id = \App\Models\Kelas::query()->first()->wali->user_id;
                break;
            case 'siswa':
                $id = \App\Models\Siswa::query()->first()->user_id;
                break;
            case 'pembina-ekskul':
                $id = \App\Models\Ekskul::query()->first()->guru->user_id;
                break;
            case 'koor-proyek':
                $id = \App\Models\Proyek::query()->first()->koordinator->user_id;
                break;
        }
        auth()->loginUsingId($id);

        return redirect('/dashboard');
    });
}
