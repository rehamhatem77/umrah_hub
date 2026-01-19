<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTourCompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
         $companyId = $this->route('tourCompany'); 
        return [
            'name'           => 'required|string|max:255',
            'phone'          => 'nullable|string|max:20',
            'whatsapp'       => 'nullable|string|max:20',
            // 'governorate_id' => 'required|exists:governorates,id',
             'governorate_ids'    => 'required|array',              
            'governorate_ids.*'  => 'exists:governorates,id', 
           'email' => [
            'nullable',
            'email',
            'max:255',
            Rule::unique('tour_companies', 'email')->ignore($companyId),
        ],

        'company_code' => [
            'required',
            'string',
            'max:100',
            Rule::unique('tour_companies', 'company_code')->ignore($companyId),
        ],
        ];
    }
    public function messages(): array
    {
        return [
            'name.required'           => 'اسم الشركة مطلوب',
            // 'governorate_id.required' => 'المحافظة مطلوبة',
            // 'governorate_id.exists'   => 'المحافظة غير صحيحة',
           'governorate_ids.required'     => 'المحافظة مطلوبة',
            'governorate_ids.array'        => 'يجب اختيار المحافظات بشكل صحيح',
            'governorate_ids.*.exists'     => 'واحدة أو أكثر من المحافظات غير صحيحة',
            'email.unique'              => 'البريد الإلكتروني مستخدم من قبل شركة أخرى',
            'company_code.required'     => 'كود الشركة مطلوب',
            'company_code.unique'       => 'كود الشركة مستخدم من قبل شركة أخرى',
        ];
    }
}
