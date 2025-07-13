<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Http\Requests\GuruRequest;
use App\Http\Resources\GuruDetailsResource;
use App\Http\Resources\GuruResource;
use App\Models\Guru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->q ?? null;
        $perPage = $request->perPage ?? 10;

        $gurus = Guru::query()
            ->with(['wilayah'])
            ->when($search, function ($query, $search) {
                return $query->where('nama', 'like', "%$search%");
            })
            ->paginate($perPage);

        return inertia('guru/index', [
                'gurus' => fn() => GuruResource::collection($gurus),

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
        return inertia('guru/form', [
            'guru' => new Guru(),
            'form' => [
                'title' => 'Buat Guru Baru',
                'url' => route('guru.store'),
                'method' => 'post'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GuruRequest $request)
    {
        $guru = Guru::query()->create($request->validated());

        if ($request->hasFile('avatar')) {
            $guru->user->update([
                'avatar' => $request->file('avatar')->store('guru')
            ]);
        }

        toast('Guru Berhasil Ditambahkan');
        return to_route('guru.show', $guru);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guru $guru)
    {
        return inertia('guru/show', [
            'guru' => GuruDetailsResource::make($guru->load(['wilayah']))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Guru $guru)
    {
        return inertia('guru/form', [
            'guru' => GuruDetailsResource::make($guru->load(['wilayah'])),
            'form' => [
                'title' => 'Edit Guru',
                'url' => route('guru.update', $guru),
                'method' => 'put'
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GuruRequest $request, Guru $guru)
    {
        $guru->update($request->validated());

        if ($request->hasFile('avatar')) {
            $guru->user->update([
                'avatar' => $request->file('avatar')->store('guru')
            ]);
        }

        toast('Data Guru Berhasil Diperbarui');
        return to_route('guru.show', $guru);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guru $guru)
    {
        //
    }
}
