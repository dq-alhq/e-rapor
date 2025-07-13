<?php

use App\Models\Wilayah;
use Illuminate\Http\Request;

Route::get('wilayah', function (Request $request) {
    $search = $request->q ?? null;
    $wilayah = Wilayah::query()
        ->when($search, function ($q) use ($search) {
            $q->where('name', 'like', "%$search%")->orWhere('id', 'like', "%$search%");
        })
        ->limit(10)
        ->get();
    return response()->json($wilayah);
});


Route::get('/image/{path}', function ($path) {
    $fullPath = storage_path('app/private/' . $path);

    if (!file_exists($fullPath)) {
        return '';
    }

    $mimeType = mime_content_type($fullPath);
    return response()->file($fullPath, ['Content-Type' => $mimeType]);
})->where('path', '.*')->name('image');
