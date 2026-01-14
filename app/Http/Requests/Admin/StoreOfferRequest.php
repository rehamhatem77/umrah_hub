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
    public function rules(): array
    {
        return [
            //
            'offer_code' => 'required|string|max:100|unique:offers,offer_code',
            'title'      => 'required|string|max:255',
            'slug'       => 'nullable|string|max:255',

            'governorate_id' => 'required|exists:governorates,id',
            'trip_type_id'   => 'required|exists:trip_types,id',
            'company_id'     => 'nullable|exists:tour_companies,id',
            'hotel_id'       => 'nullable|exists:hotels,id',

            'duration_days' => 'required|integer|min:1',
            'program'       => 'required|string',

            'price' => 'required|numeric|min:0',

            'airline' => 'nullable|string|max:255',

          
            'tour_level' => 'required|in:economical,standard,luxury,vip',

            'is_special_offer' => 'boolean',
            'is_featured'      => 'boolean',
            'is_popular'       => 'boolean',
            'is_active'        => 'boolean',

            'start_date' => 'required|date',
            'end_date'   => 'required|date|after_or_equal:start_date',

            'available_places' => 'required|integer|min:0',

            'whatsapp_number' => 'required|string|max:20',

            'seo_title'       => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',

            'features'   => 'nullable|array',
            'features.*' => 'exists:features,id',

            'images'   => 'nullable|array',
            'images.*' => 'image|max:2048',
            'is_main_image' => 'nullable|integer',
        ];
    }
}
