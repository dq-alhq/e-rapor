<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Models\Sekolah;
use Illuminate\Http\Request;

class SekolahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('sekolah/index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sekolah $sekolah)
    {
        return inertia('sekolah/form', [
            'form' => [
                'title' => 'Edit Data Sekolah',
                'url' => route('sekolah.update', $sekolah),
                'method' => 'put'
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sekolah $sekolah)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:128'],
            'jenjang' => ['required', 'string', 'max:128'],
            'npsn' => ['nullable', 'string', 'max:128'],
            'nis' => ['nullable', 'string', 'max:128'],
            'nss' => ['nullable', 'string', 'max:128'],
            'nds' => ['nullable', 'string', 'max:128'],
            'alamat' => ['nullable', 'string', 'max:128'],
            'wilayah_id' => ['nullable', 'exists:wilayahs,id'],
            'kodepos' => ['nullable', 'string', 'max:8'],
            'telepon' => ['nullable', 'string', 'max:32'],
            'email' => ['nullable', 'string', 'email'],
            'kepsek_id' => ['nullable', 'exists:gurus,id'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        $sekolah->update($validated);

        if ($request->hasFile('logo')) {
            hapusFile($sekolah->logo);
            $sekolah->update([
                'logo' => $request->file('logo')->store('sekolah')
            ]);
        }

        toast('Data Sekolah Berhasil Diperbarui');
        return to_route('sekolah.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sekolah $sekolah)
    {
        //
    }
}
