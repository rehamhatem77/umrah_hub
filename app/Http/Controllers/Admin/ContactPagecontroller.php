<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminContactPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactPagecontroller extends Controller
{
     private function contactPage()
    {
        return AdminContactPage::firstOrCreate([], [
         
            'seo_title' => '',
            'seo_description' => '',
            'seo_keywords' => '',

       
            'hero_title' => '',
            'hero_badge_title' => '',
            'hero_description' => '',

         
            'contact_title' => '',
            'contact_address' => '',
            'contact_email' => '',
            'contact_phone' => '',
            'working_hours' => '',
            "contact_location"=>"",

          
            'insta_link' => '',
            'fb_link' => '',
            'x_link' => '',

          
            'footer_desc' => '',
        ]);
    }

    public function index()
    {
        $contactPage = $this->contactPage();

        return Inertia::render('Admin/ContactUs/Index', [
            'contactPage' => $contactPage
        ]);
    }

        public function updateSection(Request $request, $section)
    {
        $contactPage = $this->contactPage();
        $rules = [];

        switch ($section) {

            case 'hero':
                $rules = [
                    'hero_title' => 'required|string|max:255',
                    'hero_badge_title' => 'nullable|string|max:255',
                    'hero_description' => 'nullable|string',
                ];
                break;

            case 'contact_info':
                $rules = [
                    'contact_title' => 'nullable|string|max:255',
                    'contact_address' => 'nullable|string',
                     'contact_location' => 'nullable|string',
                    'contact_email' => 'nullable|email|max:255',
                    'contact_phone' => 'nullable|string|max:50',
                    'working_hours' => 'nullable|string|max:255',
                    
                ];
                break;

            case 'social_links':
                $rules = [
                    'insta_link' => 'nullable|url',
                    'fb_link' => 'nullable|url',
                    'x_link' => 'nullable|url',
                ];
                break;

            case 'footer':
                $rules = [
                    'footer_desc' => 'nullable|string',
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

        $contactPage->update($data);

        return back()->with('success', 'تم تحديث القسم بنجاح');
    }
}
