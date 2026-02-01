<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminAboutUsPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutUsPageController extends Controller
{
     private function aboutUs()
    {
        return AdminAboutUsPage::firstOrCreate([], [
            'seo_title' => '',
            'seo_description' => '',
            'seo_keywords' => '',

            'hero_title' => '',
            'hero_badge_title' => '',
            'hero_description' => '',
            'hero_image' => '',
        

            'intro_title' => '',
            'intro_description' => '',
            'intro_badge' => '',
            'intro_image' => '',
            'intro_badge_sub'=>'',
            'intro_description_long' => '',

            'vision_mission_title' => '',
            'vision_mission_description' => '',
            'mission_title' => '',
            'mission_description' => '',
            'vision_title' => '',
            'vision_description' => '',

            'why_choose_us_title' => '',
            'why_choose_us_card_one_title' => '',
            'why_choose_us_card_two_title' => '',
            'why_choose_us_card_three_title' => '',
            'why_choose_us_card_one_description' => '',
            'why_choose_us_card_two_description' => '',
            'why_choose_us_card_three_description' => '',
            'why_choose_us_card_one_icon' => '',
            'why_choose_us_card_two_icon' => '',
            'why_choose_us_card_three_icon' => '',

            'statistic_one_number' => 0,
            'statistic_two_number' => 0,
            'statistic_three_number' => 0,
            'statistic_one_desc' => '',
            'statistic_two_desc' => '',
            'statistic_three_desc' => '',
            'statistic_one_prefix' => '',
            'statistic_two_prefix' => '',
            'statistic_three_prefix' => '',

            'action_title' => '',
            'action_desc' => '',
            'action_btn_txt' => '',
        ]);
    }

       public function index()
    {
        $aboutUs = $this->aboutUs();
        return Inertia::render('Admin/AboutUs/Index', [
            'aboutUs' => $aboutUs
        ]);
    }


      public function updateSection(Request $request, $section)
    {
        $aboutUs = $this->aboutUs();

        $rules = [];
        switch ($section) {
            case 'hero':
                $rules = [
                    'hero_title' => 'required|string|max:255',
                    'hero_badge_title' => 'nullable|string|max:255',
                    'hero_description' => 'required|string',
                    'hero_image' => 'required|image|max:2048',
                ];
                break;

            case 'intro':
                $rules = [
                    'intro_title' => 'required|string|max:255',
                    'intro_description' => 'required|string',
                    'intro_description_long' => 'nullable|string',
                    'intro_badge' => 'nullable|string',
                     'intro_badge_sub' => 'nullable|string',
                    'intro_image' => 'required|image',
                ];
                break;

            case 'vision_mission':
                $rules = [
                    'vision_mission_title' => 'required|string|max:255',
                    'vision_mission_description' => 'required|string',
                    'mission_title' => 'required|string|max:255',
                    'mission_description' => 'required|string',
                    'vision_title' => 'required|string|max:255',
                    'vision_description' => 'required|string',
                ];
                break;

            case 'why_choose_us':
                $rules = [
                    'why_choose_us_title' => 'required|string|max:255',
                    'why_choose_us_card_one_title' => 'required|string|max:255',
                    'why_choose_us_card_two_title' => 'required|string|max:255',
                    'why_choose_us_card_three_title' => 'required|string|max:255',
                    'why_choose_us_card_one_description' => 'required|string',
                    'why_choose_us_card_two_description' => 'required|string',
                    'why_choose_us_card_three_description' => 'required|string',
                    'why_choose_us_card_one_icon' => 'nullable|string|max:255',
                    'why_choose_us_card_two_icon' => 'nullable|string|max:255',
                    'why_choose_us_card_three_icon' => 'nullable|string|max:255',
                ];
                break;

            case 'statistics':
                $rules = [
                    'statistic_one_number' => 'required|integer',
                    'statistic_two_number' => 'required|integer',
                    'statistic_three_number' => 'required|integer',
                    'statistic_one_desc' => 'required|string|max:255',
                    'statistic_two_desc' => 'required|string|max:255',
                    'statistic_three_desc' => 'required|string|max:255',
                    'statistic_one_prefix' => 'nullable|string|max:10',
                    'statistic_two_prefix' => 'nullable|string|max:10',
                    'statistic_three_prefix' => 'nullable|string|max:10',
                ];
                break;

            case 'action':
                $rules = [
                    'action_title' => 'nullable|string|max:255',
                    'action_desc' => 'nullable|string|max:255',
                    'action_btn_txt' => 'nullable|string|max:255',
                ];
                break;

            case 'seo':
                $rules = [
                    'seo_title' => 'nullable|string|max:255',
                    'seo_description' => 'nullable|string',
                    'seo_keywords' => 'nullable|string',
                ];
                break;
        }

        $data = $request->validate($rules);

        // Handle image upload
        foreach ($data as $key => $value) {
            if ($request->hasFile($key)) {
                if ($aboutUs->$key) {
                    Storage::disk('public')->delete($aboutUs->$key);
                }
                $data[$key] = $request->file($key)->store('about_us', 'public');
            }
        }

        $aboutUs->update($data);

        return back()->with('success', 'تم تحديث القسم بنجاح');
    }
}
