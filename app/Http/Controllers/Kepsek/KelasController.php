<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Http\Requests\KelasRequest;
use App\Http\Resources\KelasDetailsResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\SiswaResource;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Tapel;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Kelas $kela = null)
    {
        $search = $request->search ?? null;
        $perPage = $request->perPage ?? 10;
        $sort = $request->sort ?? 'id';
        $dir = $request->dir ?? 'asc';

        $kelas = KelasResource::collection(
            Kelas::query()
                ->where('tapel_id', tapelAktif())
                ->withCount(['siswa'])
                ->when($search, function ($query, $search) {
                    return $query->where('nama', 'like', "%$search%");
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

        return inertia('kelas/index', [
                'kelas' => fn() => $kelas,

                'form' => [
                    'data' => new Kelas(),
                    'options' => opsiTingkat(),
                    'method' => 'post',
                    'title' => 'Tambah Kelas',
                    'url' => route('kelas.store'),
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
    public function store(KelasRequest $request)
    {
        Tapel::find(tapelAktif())->kelas()->create($request->validated());

        toast('Kelas Berhasil Ditambahkan');
        return to_route('kelas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Kelas $kela)
    {
        return inertia('kelas/show', [
            'kelas' => KelasDetailsResource::make($kela->load(['wali', 'siswa'])),
            'form' => [
                'data' => $kela->load(['wali', 'siswa']),
                'options' => opsiTingkat(),
                'method' => 'put',
                'title' => 'Edit Kelas',
                'url' => route('kelas.update', $kela),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Kelas $kela)
    {
        return $this->show($request, $kela);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KelasRequest $request, Kelas $kela)
    {
        $kela->update($request->validated());

        toast('Kelas Berhasil Diubah');
        return to_route('kelas.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelas $kelas)
    {
        //
    }

    public function anggota_kelas(Request $request, Kelas $kelas)
    {
        $search = $request->search ?? null;
        $perPage = $request->perPage ?? 10;
        $filter = $request->filter ?? null;
        $anggota_kelas = Siswa::query()
            ->whereHas('anggotaKelas', fn($query) => $query->where('kelas_id', $kelas->id))
            ->when($filter, function ($query, $tahun_masuk) {
                return $query->whereIn('tahun_masuk', $tahun_masuk);
            })
            ->when($search, function ($query, $search) {
                return $query->where('nama', 'like', "%$search%");
            })
            ->paginate($perPage);

        $bukan_anggota_kelas = Siswa::query()
            ->whereDoesntHave('anggotaKelas')
            ->when($filter, function ($query, $tahun_masuk) {
                return $query->whereIn('tahun_masuk', $tahun_masuk);
            })
            ->when($search, function ($query, $search) {
                return $query->where('nama', 'like', "%$search%");
            })
            ->paginate($perPage);

        return inertia('kelas/anggota-form', [
                'kelas' => KelasDetailsResource::make($kelas->load(['wali'])),
                'bukan_anggota_kelas' => fn() => SiswaResource::collection($bukan_anggota_kelas),
                'anggota_kelas' => fn() => SiswaResource::collection($anggota_kelas),
                'angkatan' => opsiAngkatan()
            ]
        );
    }

    public function update_anggota_kelas(Request $request, Kelas $kelas)
    {
        if ($kelas->anggotaKelas()->where('siswa_id', $request->siswa)->exists()) {
            $kelas->siswa()->detach($request->siswa);
            toast('Berhasil menghapus Anggota Kelas');
        } else {
            $kelas->siswa()->attach($request->siswa);
            toast('Berhasil menambahkan Anggota Kelas');
        }
    }
}
