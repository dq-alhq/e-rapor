<?php

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelompokMapel;
use App\Models\Mapel;
use App\Models\Pembelajaran;
use App\Models\Wilayah;
use Illuminate\Http\Request;

Route::get('wilayah', function (Request $request) {
    $search = $request->q ?? null;
    $data = Wilayah::search($search)->get();
    return response()->json($data->map(fn($d) => ['id' => $d->id, 'label' => $d->name]));
});

Route::get('guru', function (Request $request) {
    $search = $request->q ?? null;
    $data = Guru::search($search)->get();
    return response()->json($data->map(fn($d) => ['id' => $d->id, 'label' => $d->nama]));
});

Route::get('guru-mapel', function (Request $request) {
    $search = $request->q ?? null;
    $mapel = $request->mapel ?? null;

    $guru = Guru::search($search)
        ->get();

    $guru_ids = Pembelajaran::query()
        ->where('mapel_id', $mapel)
        ->pluck('guru_id')
        ->toArray();


    $data = $guru->filter(fn($d) => in_array($d->id, $guru_ids))->values();

    return response()->json($data->map(fn($d) => ['id' => $d->id, 'label' => $d->nama]));
});

Route::get('kelas', function (Request $request) {
    $search = $request->q ?? null;
    $data = Kelas::search($search)->get();
    return response()->json($data->map(fn($d) => ['id' => $d->id, 'label' => $d->nama]));
});

Route::get('mapel', function (Request $request) {
    $search = $request->q ?? null;
    $data = Mapel::search($search)->get();
    return response()->json($data->map(fn($d) => ['id' => $d->id, 'label' => $d->nama]));
});

Route::get('kelompok-mapel', function (Request $request) {
    $search = $request->q ?? null;
    $data = KelompokMapel::search($search)->get();
    return response()->json($data->map(fn($d) => ['id' => $d->id, 'label' => $d->nama]));
});

Route::get('/image/{path}', function ($path) {
    $fullPath = storage_path('app/private/' . $path);

    if (!file_exists($fullPath)) {
        return '';
    }

    $mimeType = mime_content_type($fullPath);
    return response()->file($fullPath, ['Content-Type' => $mimeType]);
})->where('path', '.*')->name('image');
