<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TourCompany extends Model

{
    use SoftDeletes;


    protected $fillable = [
        'name',
        'phone',
        'whatsapp',
        // 'governorate_id',
        'company_code',
        'email',
        'governorate_ids',
    ];
    protected $dates = ['deleted_at'];
    protected $casts = [
        'governorate_ids' => 'array',
    ];

    // public function governorate()
    // {
    //     return $this->belongsToMany(Governorate::class);
    // }

   public function getGovernoratesAttribute()
    {
        if (!isset($this->governorate_ids) || empty($this->governorate_ids)) {
            return collect();
        }

        return Governorate::whereIn('id', $this->governorate_ids)->get();
    }

    public function offers()
    {
        return $this->hasMany(Offer::class,'company_id');
    }
}
