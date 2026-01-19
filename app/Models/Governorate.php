<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Governorate extends Model
{

    protected $fillable = [
        'name',
        'slug',

    ];

    // public function offers()
    // {
    //     return $this->hasMany(Offer::class);
    // }
    public function offers()
    {
        return $this->belongsToMany(Offer::class);
    }
}
