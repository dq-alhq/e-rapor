<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnggotaEkskulResource;
use App\Http\Resources\AnggotaKelasResource;
use App\Http\Resources\EkskulDetailsResource;
use App\Http\Resources\EkskulResource;
use App\Models\AnggotaKelas;
use App\Models\Ekskul;
use App\Models\Kelas;
use Illuminate\Http\Request;

class EkskulController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Ekskul $ekskul = null)
    {
        $search = $request->search ?? null;
        $perPage = $request->perPage ?? 10;
        $sort = $request->sort ?? 'id';
        $dir = $request->dir ?? 'asc';

        $ekskuls = EkskulResource::collection(
            Ekskul::query()
                ->withCount(['anggota_ekskul'])
                ->with(['guru'])
                ->when($search, function ($query, $search) {
                    return $query->where('nama', 'like', "%$search%")->orWhere('deskripsi', 'like', "%$search%");
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

        return inertia('ekskul/index', [
                'ekskuls' => fn() => $ekskuls,

                'form' => [
                    'data' => new Ekskul(),
                    'method' => 'post',
                    'title' => 'Tambah Ekstrakurikuler',
                    'url' => route('ekskul.store'),
                ]
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return $this->index($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'guru_id' => 'required|exists:gurus,id',
            'nama' => 'required|string|max:128|unique:ekskuls,nama',
            'deskripsi' => 'required|string|max:256',
        ]);

        Ekskul::create($validated);
        toast('Ekstrakurikuler Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Ekskul $ekskul)
    {
        return inertia('ekskul/show', [
            'ekskul' => EkskulDetailsResource::make($ekskul->load(['guru'])),
            'form' => [
                'data' => $ekskul->load(['guru', 'anggota_ekskul']),
                'method' => 'put',
                'title' => 'Edit Ekstrakurikuler',
                'url' => route('ekskul.update', $ekskul),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Ekskul $ekskul)
    {
        return $this->show($request, $ekskul);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ekskul $ekskul)
    {
        $validated = $request->validate([
            'guru_id' => 'required|exists:gurus,id',
            'nama' => 'required|string|max:128|unique:ekskuls,nama,' . $ekskul->id,
            'deskripsi' => 'required|string|max:256',
        ]);

        $ekskul->update($validated);
        toast('Ekstrakurikuler Berhasil Diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ekskul $ekskul)
    {
        //
    }

    public function anggota_ekskul(Request $request, Ekskul $ekskul)
    {
        $search = $request->search ?? null;
        $perPage = $request->perPage ?? 10;
        $filter = $request->filter ?? null;

        $anggota_ekskuls = AnggotaKelas::query()
            ->whereHas('anggotaEkskul', function ($query) use ($ekskul) {
                return $query->where('ekskul_id', $ekskul->id);
            })
            ->whereHas('kelas', function ($query) use ($filter) {
                return $query->where('tapel_id', tapelAktif())->when($filter, function ($query, $k) {
                    return $query->whereIn('id', $k);
                });
            })
            ->when($search, function ($query, $search) {
                return $query->whereHas('siswa', function ($query) use ($search) {
                    $query->where('nama', 'like', "%$search%");
                });
            })
            ->paginate($perPage);


        $bukan_anggota_ekskuls = AnggotaKelas::query()
            ->whereDoesntHave('anggotaEkskul', function ($query) use ($ekskul) {
                return $query->where('ekskul_id', $ekskul->id);
            })
            ->whereHas('kelas', function ($query) use ($filter) {
                return $query->where('tapel_id', tapelAktif())->when($filter, function ($query, $k) {
                    return $query->whereIn('id', $k);
                });
            })
            ->when($search, function ($query, $search) {
                return $query->whereHas('siswa', function ($query) use ($search) {
                    $query->where('nama', 'like', "%$search%");
                });
            })
            ->paginate($perPage);

        $kelas = Kelas::query()->where('tapel_id', tapelAktif())->get();


        return inertia('ekskul/anggota-form', [
                'ekskul' => EkskulDetailsResource::make($ekskul->load(['guru'])),
                'bukan_anggota_ekskuls' => fn() => AnggotaKelasResource::collection($bukan_anggota_ekskuls),
                'anggota_ekskuls' => fn() => AnggotaKelasResource::collection($anggota_ekskuls),
                'kelas' => $kelas->map(fn($kelas) => [
                    'id' => $kelas->id,
                    'nama' => $kelas->nama,
                ]),
            ]
        );
    }

    public function update_anggota_ekskul(Request $request, Ekskul $ekskul)
    {
        if ($ekskul->anggota_kelas()->where('anggota_kelas_id', $request->anggota_kelas)->exists()) {
            $ekskul->anggota_kelas()->detach($request->anggota_kelas);
            toast('Berhasil menghapus Anggota Ekstrakurikuler');
        } else {
            $ekskul->anggota_kelas()->attach($request->anggota_kelas);
            toast('Berhasil menambahkan Anggota Ekstrakurikuler');
        }
    }
}
