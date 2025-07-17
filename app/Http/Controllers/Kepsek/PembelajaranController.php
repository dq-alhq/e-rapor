<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Pembelajaran;
use Illuminate\Http\Request;

class PembelajaranController extends Controller
{
    public function createByMapel(Mapel $mapel, Kelas $kelas)
    {
        $guru = Pembelajaran::query()->where('mapel_id', $mapel->id)->where('kelas_id', $kelas->id)->first()->guru->id ?? null;
        return MapelController::show($mapel, $kelas, $guru);
    }

    public function updateByMapel(Request $request, Mapel $mapel)
    {
        Pembelajaran::query()->where('mapel_id', $mapel->id)->delete();
    }

    public function createByKelas(Request $request, Kelas $kelas)
    {
//
    }

    public function updateByKelas(Request $request, Kelas $kelas)
    {
//
    }
}
