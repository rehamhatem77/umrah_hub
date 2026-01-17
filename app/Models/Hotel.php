<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Hotel extends Model
{
    use SoftDeletes;
    protected $fillable = [
    'name',
    'slug',
    'city',
    'distance_from_kaaba',
    'distance_from_nabawi',
    'stars',
    'address_location',
    'features',
    'is_active',
];
protected $dates = ['deleted_at']; 

 


    public function offers()
    {
        return $this->hasMany(Offer::class);
    }


    public function getDistanceAttribute()
    {
        return $this->city === 'مكة'
            ? $this->distance_from_kaaba
            : $this->distance_from_nabawi;
    }
}
