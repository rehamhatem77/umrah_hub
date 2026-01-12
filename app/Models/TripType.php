<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TripType extends Model
{

    protected $fillable = [
        'name',
        'slug',
        'seo_title',
        'seo_description',
    ];

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
}
