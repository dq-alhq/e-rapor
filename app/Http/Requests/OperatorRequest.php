<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OperatorRequest extends FormRequest
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
            'nip' => ['nullable', 'string', 'max:18', 'unique:operators,nip,' . $this->operator->id],
            'nuptk' => ['nullable', 'string', 'max:16', 'unique:operators,nuptk,' . $this->operator->id],
            'nik' => ['nullable', 'string', 'max:16', 'unique:operators,nik,' . $this->operator->id],
            'tempat_lahir' => ['nullable', 'string', 'max:255'],
            'tanggal_lahir' => ['nullable', 'date'],
            'telepon' => ['nullable', 'string', 'max:20'],
            'alamat' => ['nullable', 'string', 'max:255'],
            'wilayah_id' => ['nullable', 'exists:wilayahs,id'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ];
    }
}
