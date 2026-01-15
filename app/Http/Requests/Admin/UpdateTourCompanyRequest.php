<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTourCompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'           => 'required|string|max:255',
            'phone'          => 'nullable|string|max:20',
            'whatsapp'       => 'nullable|string|max:20',
            'governorate_id' => 'required|exists:governorates,id',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required'           => 'اسم الشركة مطلوب',
            'governorate_id.required' => 'المحافظة مطلوبة',
            'governorate_id.exists'   => 'المحافظة غير صحيحة',
        ];
    }
}
