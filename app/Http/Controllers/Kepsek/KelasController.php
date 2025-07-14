<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Http\Requests\KelasRequest;
use App\Http\Resources\KelasResource;
use App\Models\Kelas;
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
                    'data' => $kela ? $kela->load('wali') : new Kelas(),
                    'method' => $kela ? 'put' : 'post',
                    'title' => $kela ? 'Edit Kelas' : 'Tambah Kelas',
                    'url' => $kela ? route('kelas.update', $kela) : route('kelas.store'),
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
    public function show(Kelas $kelas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Kelas $kela)
    {
        return $this->index($request, $kela);
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
}
