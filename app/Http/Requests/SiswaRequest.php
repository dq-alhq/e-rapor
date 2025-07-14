<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SiswaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:255'],
            'jk' => ['required', 'in:l,p'],
            'nis' => ['nullable', 'string', 'max:18', 'unique:siswas,nis,' . $this->siswa->id],
            'nisn' => ['nullable', 'string', 'max:16', 'unique:siswas,nisn,' . $this->siswa->id],
            'nik' => ['nullable', 'string', 'max:16', 'unique:siswas,nik,' . $this->siswa->id],
            'tempat_lahir' => ['nullable', 'string', 'max:255'],
            'tanggal_lahir' => ['nullable', 'date'],
            'telepon' => ['nullable', 'string', 'max:20'],
            'alamat' => ['nullable', 'string', 'max:255'],
            'wilayah_id' => ['nullable', 'exists:wilayahs,id'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],

            'status_dalam_keluarga' => ['nullable', 'in:1,2,3'],
            'anak_ke' => ['nullable', 'numeric'],
            'nama_ayah' => ['nullable', 'string', 'max:255'],
            'pekerjaan_ayah' => ['nullable', 'string', 'max:255'],
            'nama_ibu' => ['nullable', 'string', 'max:255'],
            'pekerjaan_ibu' => ['nullable', 'string', 'max:255'],
            'nama_wali' => ['nullable', 'string', 'max:255'],
            'pekerjaan_wali' => ['nullable', 'string', 'max:255'],
            'telepon_wali' => ['nullable', 'string', 'max:20'],
        ];
    }
}
