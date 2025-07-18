<?php

namespace App\Http\Controllers;

use App\Http\Resources\JadwalResource;
use App\Models\Jadwal;
use App\Models\Kelas;
use Illuminate\Http\Request;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jadwals = Jadwal::query()->with('pembelajaran')->get();
        $kelas = Kelas::query()->where('tapel_id', tapelAktif())->select(['id', 'nama', 'tingkat'])->get();
        return inertia('jadwal/index', [
            'jadwals' => JadwalResource::collection($jadwals),
            'kelas' => $kelas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Jadwal $jadwal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jadwal $jadwal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jadwal $jadwal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jadwal $jadwal)
    {
        //
    }
}
