<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminAboutUsPage extends Model
{
    //
    use HasFactory;

    protected $table = 'admin_about_us';

    protected $fillable = [
        'seo_title', 'seo_description', 'seo_keywords',
        'hero_title', 'hero_badge_title', 'hero_description', 'hero_image',
        'intro_title', 'intro_description', 'intro_badge', 'intro_image','intro_description_long','intro_badge_sub',
        'vision_mission_title', 'vision_mission_description', 'mission_title', 'mission_description', 'vision_title', 'vision_description',
        'why_choose_us_title', 'why_choose_us_card_one_title', 'why_choose_us_card_two_title', 'why_choose_us_card_three_title',
        'why_choose_us_card_one_description', 'why_choose_us_card_two_description', 'why_choose_us_card_three_description',
        'why_choose_us_card_one_icon', 'why_choose_us_card_two_icon', 'why_choose_us_card_three_icon',
        'statistic_one_number', 'statistic_two_number', 'statistic_three_number',
        'statistic_one_desc', 'statistic_two_desc', 'statistic_three_desc',
        'statistic_one_prefix', 'statistic_two_prefix', 'statistic_three_prefix',
        'action_title', 'action_desc', 'action_btn_txt'
    ];

}
