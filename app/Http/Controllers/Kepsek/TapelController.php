<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Http\Requests\TapelRequest;
use App\Http\Resources\TapelResource;
use App\Models\Tapel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TapelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Tapel $tapel = null)
    {
        $search = $request->search ?? null;
        $perPage = $request->perPage ?? 10;
        $sort = $request->sort ?? 'tahun';
        $dir = $request->dir ?? 'desc';

        $tapels = TapelResource::collection(
            Tapel::query()
                ->withCount(['kelas', 'proyek', 'siswa'])
                ->when($search, function ($query, $search) {
                    return $query->where('tahun', 'like', "%$search%");
                })
                ->paginate($perPage)
        )->additional([
            'attributes' => [
                'search' => $search,
                'perPage' => $perPage,
                'sort' => $sort,
                'dir' => $dir,
            ]
        ]);;

        return inertia('tapel/index', [
                'tapels' => fn() => $tapels,
                'form' => [
                    'data' => $tapel ? TapelResource::make($tapel) : new Tapel(),
                    'method' => $tapel ? 'put' : 'post',
                    'title' => $tapel ? 'Edit Tahun Pelajaran' : 'Tambah Tahun Pelajaran',
                    'url' => $tapel ? route('tapel.update', $tapel) : route('tapel.store'),
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
            'tahun' => ['required', 'numeric', 'digits:4', Rule::unique('tapels', 'tahun')->where('semester', $request->semester)],
            'semester' => ['required', 'in:1,2'],
            'tempat_rapor' => ['nullable', 'string'],
            'tanggal_rapor' => ['nullable', 'date'],
        ]);
        Tapel::create($validated);
        toast('Tahun Pelajaran Berhasil Ditambahkan');
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Tapel $tapel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Tapel $tapel)
    {
        return $this->index($request, $tapel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tapel $tapel)
    {
        $validated = $request->validate([
            'tahun' => ['required', 'numeric', 'digits:4', Rule::unique('tapels', 'tahun')->where('semester', $request->semester)->ignore($tapel->id)],
            'semester' => ['required', 'in:1,2'],
            'tempat_rapor' => ['nullable', 'string'],
            'tanggal_rapor' => ['nullable', 'date'],
        ]);
        $tapel->update($validated);
        toast('Tahun Pelajaran Berhasil Diperbarui');
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tapel $tapel)
    {
        //
    }

    public function aktif(Tapel $tapel)
    {
        $tapel->aktif = !$tapel->aktif;
        Tapel::where('aktif', true)->update(['aktif' => false]);
        $tapel->save();

        session()->forget('tapel');
        toast('Tahun Pelajaran Diaktifkan');
        return back();
    }
}
