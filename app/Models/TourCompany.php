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
        'governorate_id',
    ];
     protected $dates = ['deleted_at']; 

    public function governorate()
    {
        return $this->belongsTo(Governorate::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
}
