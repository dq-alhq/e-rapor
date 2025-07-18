<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Http\Resources\MapelDetailsResource;
use App\Http\Resources\MapelResource;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Pembelajaran;
use Illuminate\Http\Request;

class MapelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? null;
        $perPage = $request->perPage ?? 10;
        $sort = $request->sort ?? 'urutan';
        $dir = $request->dir ?? 'asc';

        $mapels = MapelResource::collection(
            Mapel::query()
                ->with('kelompokMapel')
                ->withCount(['guru'])
                ->when($search, function ($query, $search) {
                    return $query->where('nama', 'like', "%$search%")->orWhere('singkatan', 'like', "%$search%");
                })
                ->when($sort, function ($query, $sort) use ($dir) {
                    return $query->orderBy($sort, $dir);
                })
                ->paginate($perPage)
        )->additional([
            'attributes' => [
                'search' => $search,
                'perPage' => $perPage,
                'sort' => $sort,
                'dir' => $dir,
            ]
        ]);

        return inertia('mapel/index', [
                'mapels' => fn() => $mapels,
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('mapel/form', [
                'form' => [
                    'data' => new Mapel(),
                    'title' => 'Buat Mapel Baru',
                    'url' => route('mapel.store'),
                    'method' => 'post'
                ]
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelompok_mapel_id' => 'required|exists:kelompok_mapels,id',
            'nama' => 'required|string|max:128',
            'singkatan' => 'required|string|size:3|alpha|unique:mapels,singkatan|uppercase',
        ]);

        Mapel::create($validated);
        toast('Mata Pelajaran Berhasil Ditambahkan');
        return to_route('mapel.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Mapel $mapel, Kelas $kelas = null, Guru $guru = null)
    {
        $daftarKelas = Kelas::query()->where('tapel_id', tapelAktif())->orderBy('tingkat')->select(['id', 'nama'])->get();

        return inertia('mapel/show', [
            'mapel' => MapelDetailsResource::make($mapel->load(['kelompokMapel', 'guru', 'kelas'])),
            'kelas' => $daftarKelas,

            'form' => [
                'kelas' => $kelas ?? new Kelas(),
                'guru' => $guru ?? new Guru(),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mapel $mapel)
    {
        return inertia('mapel/form', [
                'form' => [
                    'data' => $mapel,
                    'title' => 'Edit Mapel',
                    'url' => route('mapel.update', $mapel->id),
                    'method' => 'put'
                ]]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mapel $mapel)
    {
        $validated = $request->validate([
            'kelompok_mapel_id' => 'required|exists:kelompok_mapels,id',
            'nama' => 'required|string|max:128',
            'singkatan' => 'required|string|size:3|alpha|unique:mapels,singkatan,' . $mapel->id . '|uppercase',
        ]);

        $mapel->update($validated);
        toast('Mata Pelajaran Berhasil Diubah');
        return to_route('mapel.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mapel $mapel)
    {
        //
    }

    public function pembelajaran(Request $request, Mapel $mapel, Kelas $kelas)
    {
        $guru = Pembelajaran::query()
            ->where('mapel_id', $mapel->id)
            ->where('kelas_id', $kelas->id)
            ->first()->guru ?? null;

        return $this->show($request, $mapel, $kelas, $guru);
    }

    public function updatePembelajaran(Mapel $mapel, Kelas $kelas)
    {
        $validated = request()->validate([
            'guru_id' => 'required|exists:gurus,id',
        ]);
        $pembelajaran = Pembelajaran::query()
            ->where('mapel_id', $mapel->id)
            ->where('kelas_id', $kelas->id)
            ->first();

        if ($pembelajaran) {
            $pembelajaran->update($validated);
        } else {
            Pembelajaran::create([
                'mapel_id' => $mapel->id,
                'kelas_id' => $kelas->id,
                'guru_id' => $validated['guru_id']
            ]);
        }

        toast('Pembelajaran Berhasil Diubah');
    }
}
