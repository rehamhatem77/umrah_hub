<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class HotelRequest extends FormRequest
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
        'name' => [
            'required',
            'string',
            'max:255',
            'unique:hotels,name'
        ],

        'city' => ['required', 'in:مكة,المدينة المنورة'],

        'distance_from_kaaba' => [
            'nullable',
            'numeric',
            'required_if:city,مكة',
        ],

        'distance_from_nabawi' => [
            'nullable',
            'numeric',
            'required_if:city,المدينة المنورة',
        ],

        'stars' => ['required', 'integer', 'min:1', 'max:5'],
        'address_location' => ['nullable', 'string'],
        'features' => ['nullable', 'string'],
        'is_active' => ['boolean'],
    ];
}



    public function messages(): array
    {
        return [
            'name.required' => 'اسم الفندق مطلوب',
            'name.unique' => 'اسم الفندق مستخدم بالفعل',
            'city.required' => 'المدينة مطلوبة',
            'city.in' => 'المدينة المختارة غير صالحة',
            'slug.unique' => 'هذا الرابط التعريفي مستخدم بالفعل',

            'distance_from_kaaba.required_if' =>
                'المسافة من الكعبة مطلوبة عند اختيار مكة',

            'distance_from_nabawi.required_if' =>
                'المسافة من المسجد النبوي مطلوبة عند اختيار المدينة',

            'stars.required' => 'التقييم مطلوب',
            'stars.min' => 'أقل تقييم نجمة واحدة',
            'stars.max' => 'أقصى تقييم 5 نجوم',

            'address_location.required' => 'العنوان مطلوب',
        ];
    }
}
