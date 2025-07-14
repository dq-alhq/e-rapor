<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KelasRequest extends FormRequest
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
            'tingkat' => 'required|in:1,2,3,4,5,6,7,8,9,10,11,12',
            'nama' => 'required|string|max:64',
            'wali_id' => 'required|exists:gurus,id',
        ];
    }
}
