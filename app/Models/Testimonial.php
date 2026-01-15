<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
     protected $fillable = [
        'customer_name',
        'rating',
        'comment',
        'is_active',
    ];
    protected $dates = ['deleted_at'];
    
}
