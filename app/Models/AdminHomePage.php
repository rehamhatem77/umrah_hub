<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminHomePage extends Model
{

    protected $table = 'admin_home_page';

     protected $fillable = [
       
        'hero_title',
        'hero_description',
        'hero_image',

        
        'services_title',
        'services_description',

       
        'special_title',
        'special_description',
        'special_button_text',

       
        'packages_title',
        'packages_description',
        'packages_button_text',

        'testimonials_title',
        'testimonials_description',
    ];

    protected $guarded = [];

}
