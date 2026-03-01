<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminHomePage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminHomePageController extends Controller
{
    private function homepage()
    {
        return AdminHomePage::firstOrCreate([], [
            'hero_title' => null,
            'hero_description' => null,
            'hero_image' => "",
            'services_title' => '',
            'services_description' => '',
            'special_title' => '',
            'special_description' => '',
            'special_button_text' => '',
            'packages_title' => '',
            'packages_description' => '',
            'packages_button_text' => '',
            'testimonials_title' => '',
            'testimonials_description' => '',
        ]);
    }

    public function index()
    {
        $homepage = $this->homepage();
        return Inertia::render('Admin/HomePage/Index', [
            'homepage' => $homepage
        ]);
    }

    public function updateHero(Request $request)
    {
        try {
            $homepage = $this->homepage();

            $validated = $request->validate([
                'hero_title' => 'nullable|string|max:255',
                'hero_description' => 'nullable|string',
            ]);

            if ($request->hasFile('hero_image')) {
                if ($homepage->hero_image) {
                    Storage::disk('public')->delete($homepage->hero_image);
                }
                $validated['hero_image'] = $request->file('hero_image')->store('homepage', 'public');
            } else {
                $validated['hero_image'] = $homepage->hero_image;
            }

            $homepage->update($validated);

            return back()->with('success', 'تم تحديث قسم الهيرو');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث قسم الهيرو: ' . $e->getMessage());
        }
    }



    public function updateServices(Request $request)
    {
        try {
            $data = $request->validate([
                'services_title' => 'required|string|max:255',
                'services_description' => 'required|string',
            ]);

            $this->homepage()->update($data);

            return back()->with('success', 'تم تحديث قسم الخدمات');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث قسم الخدمات: ' . $e->getMessage());
        }
    }

    public function updateSpecial(Request $request)
    {
        try {
            $data = $request->validate([
                'special_title' => 'required|string|max:255',
                'special_description' => 'required|string',
                'special_button_text' => 'required|string|max:255',
            ]);

            $this->homepage()->update($data);

            return back()->with('success', 'تم تحديث قسم العروض المميزة');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث قسم العروض المميزة: ' . $e->getMessage());
        }
    }

    public function updatePackages(Request $request)
    {
        try {
            $data = $request->validate([
                'packages_title' => 'required|string|max:255',
                'packages_description' => 'nullable|string',
                'packages_button_text' => 'required|string|max:255',
            ]);

            $this->homepage()->update($data);

            return back()->with('success', 'تم تحديث قسم جميع الباقات');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث قسم جميع الباقات: ' . $e->getMessage());
        }
    }

    public function updateTestimonials(Request $request)
    {
        try {
            $data = $request->validate([
                'testimonials_title' => 'required|string|max:255',
                'testimonials_description' => 'required|string',
            ]);

            $this->homepage()->update($data);

            return back()->with('success', 'تم تحديث قسم آراء العملاء');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث قسم آراء العملاء: ' . $e->getMessage());
        }
    }

    public function deleteHeroImage()
    {
        try {
            $homepage = $this->homepage();
            if ($homepage->hero_image) {
                Storage::disk('public')->delete($homepage->hero_image);
                $homepage->update(['hero_image' => null]);
            }

            return back()->with('success', 'تم حذف صورة الهيرو');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف صورة الهيرو: ' . $e->getMessage());
        }
    }
}
