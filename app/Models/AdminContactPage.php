<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminContactPage extends Model
{
     protected $table = 'admin_contact_page';

    protected $fillable = [
    
        'seo_title',
        'seo_description',
        'seo_keywords',

      
        'hero_title',
        'hero_badge_title',
        'hero_description',

    
        'contact_title',
        'contact_address',
        'contact_email',
        'contact_phone',
        'working_hours',
        "contact_location",

   
        'insta_link',
        'fb_link',
        'x_link',

       
        'footer_desc',
    ];
}
