<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TourCompany extends Model
{

    protected $fillable = [
        'name',
        'phone',
        'whatsapp',
        'governorate_id',
    ];

    public function governorate()
    {
        return $this->belongsTo(Governorate::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
}
