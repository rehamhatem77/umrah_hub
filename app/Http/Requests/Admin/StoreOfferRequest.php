<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfferRequest extends FormRequest
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
    protected function prepareForValidation()
{
    $this->merge([
        'whatsapp_number' => $this->whatsapp_number ?? '01111111111',
    ]);
}

    public function rules(): array
    {
        return [
            //
            'offer_code' => 'required|string|max:100|unique:offers,offer_code',
            'title'      => 'required|string|max:255',
            'slug'       => 'nullable|string|max:255',

            'trip_type_id'   => 'required|exists:trip_types,id',
            'company_id'     => 'required|exists:tour_companies,id',

            'duration_days' => 'required|integer|min:1',
            'program'       => 'required|string',

            'price' => 'required|numeric|min:0',

            'airline' => 'required|string|max:255',

          
            'tour_level' => 'required|in:economical,standard,luxury,vip',

            'governorates' => 'required|array',
            'governorates.*' => 'exists:governorates,id',

            'hotels' => 'required|array',
            'hotels.*' => 'exists:hotels,id',

            'is_special_offer' => 'boolean',
            'is_featured'      => 'boolean',
            'is_popular'       => 'boolean',
            'is_active'        => 'boolean',

            'start_date' => 'required|date',
            'end_date'   => 'required|date|after_or_equal:start_date',

            'available_places' => 'required|integer|min:0',

            'whatsapp_number' => 'nullable|string|max:20',

            'seo_title'       => 'required|string|max:255',
            'seo_description' => 'required|string',

            'features'   => 'nullable|array',
            'features.*' => 'exists:features,id',

            'images'   => 'nullable|array',
            'images.*' => 'image|max:2048',
            'is_main_image' => 'nullable|integer',
        ];
    }
}
