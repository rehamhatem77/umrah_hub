<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Hotel extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'city',
        'distance_from_kaaba',
        'distance_from_nabawi',
        'stars',
        'features',
        'address_location',
        'is_active',
    ];

    protected static function booted()
    {
        static::creating(function ($hotel) {
            $hotel->slug = Str::slug($hotel->name);
        });
    }


    public function offers()
    {
        return $this->hasMany(Offer::class);
    }


    public function getDistanceAttribute()
    {
        return $this->city === 'makkah'
            ? $this->distance_from_kaaba
            : $this->distance_from_nabawi;
    }
}
