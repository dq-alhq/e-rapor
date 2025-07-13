<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Http\Requests\SiswaRequest;
use App\Http\Resources\SiswaDetailsResource;
use App\Http\Resources\SiswaResource;
use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->q ?? null;
        $perPage = $request->perPage ?? 10;

        $siswas = Siswa::query()
            ->with(['wilayah'])
            ->when($search, function ($query, $search) {
                return $query->where('nama', 'like', "%$search%");
            })
            ->paginate($perPage);

        return inertia('siswa/index', [
                'siswas' => fn() => SiswaResource::collection($siswas),

                'page_options' => [
                    'search' => $search,
                    'perPage' => $perPage
                ],
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('siswa/form', [
            'siswa' => new Siswa(),
            'form' => [
                'title' => 'Buat Siswa Baru',
                'url' => route('siswa.store'),
                'method' => 'post'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SiswaRequest $request)
    {
        $siswa = Siswa::query()->create($request->validated());

        if ($request->hasFile('avatar')) {
            $siswa->user->update([
                'avatar' => $request->file('avatar')->store('siswa')
            ]);
        }

        toast('Siswa Berhasil Ditambahkan');
        return to_route('siswa.show', $siswa);
    }

    /**
     * Display the specified resource.
     */
    public function show(Siswa $siswa)
    {
        return inertia('siswa/show', [
            'siswa' => SiswaDetailsResource::make($siswa->load(['wilayah'])),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Siswa $siswa)
    {
        return inertia('siswa/form', [
            'siswa' => SiswaDetailsResource::make($siswa->load(['wilayah'])),
            'form' => [
                'title' => 'Edit Siswa',
                'url' => route('siswa.update', $siswa),
                'method' => 'put'
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SiswaRequest $request, Siswa $siswa)
    {
        $siswa->update($request->validated());

        if ($request->hasFile('avatar')) {
            $siswa->user->update([
                'avatar' => $request->file('avatar')->store('siswa')
            ]);
        }

        toast('Data Siswa Berhasil Diperbarui');
        return to_route('siswa.show', $siswa);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Siswa $siswa)
    {
        //
    }
}
