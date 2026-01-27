<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\AdminHomePage;
use App\Models\Offer;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    protected function homePageData(): AdminHomePage
    {
        return AdminHomePage::firstOrCreate([]);
    }


    public function index(Request $request)
    {
        return Inertia::render('Welcome', [
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion'     => PHP_VERSION,

            'homepage'       => $this->homePageData(),

            'services'       => $this->services(),
            'specialOffers'  => $this->specialOffers($request),
            'packages'       => $this->packages($request),
            'popularOffers'  => $this->popularOffers(),
            'testimonials'   => $this->testimonials(),
        ]);
    }

    protected function services()
    {
        return Service::select('id', 'name', 'description', 'icon')
            ->latest()
            ->take(4)
            ->get();
    }

    protected function specialOffers(Request $request)
    {
        return Offer::with([
            'governorates',
            'tripType',
            // 'company',
            'hotels',
            'features',
            'images',
            'mainImage'
        ])
            ->when(
                $request->governorate_id,
                fn($q) =>
                $q->whereHas(
                    'governorates',
                    fn($g) =>
                    $g->where('governorates.id', $request->governorate_id)
                )
            )
            ->when(
                $request->hotel_id,
                fn($q) =>
                $q->whereHas(
                    'hotels',
                    fn($g) =>
                    $g->where('hotels.id', $request->hotel_id)
                )
            )
            // ->when($request->company_id, fn($q) =>
            //     $q->where('company_id', $request->company_id)
            // )
            ->when(
                $request->trip_type_id,
                fn($q) =>
                $q->where('trip_type_id', $request->trip_type_id)
            )
            ->where('is_special_offer', true)
            ->where('is_active', true)
            ->whereDate('end_date', '>=', now())
            ->latest()
            ->take(3)
            ->get();
    }
    protected function packages(Request $request)
    {
        return Offer::with([
            'governorates',
            'tripType',
            // 'company',
            'hotels',
            'features',
            'images',
            'mainImage'
        ])
            ->when(
                $request->governorate_id,
                fn($q) =>
                $q->whereHas(
                    'governorates',
                    fn($g) =>
                    $g->where('governorates.id', $request->governorate_id)
                )
            )
            ->when(
                $request->hotel_id,
                fn($q) =>
                $q->whereHas(
                    'hotels',
                    fn($g) =>
                    $g->where('hotels.id', $request->hotel_id)
                )
            )
            // ->when($request->company_id, fn($q) =>
            //     $q->where('company_id', $request->company_id)
            // )
            ->when(
                $request->trip_type_id,
                fn($q) =>
                $q->where('trip_type_id', $request->trip_type_id)
            )

            ->where('is_active', true)
            ->whereDate('end_date', '>=', now())
            ->latest()
            ->take(10)
            ->get();
    }

    protected function popularOffers()
    {
        return Offer::with([
            'mainImage',
            'hotels:id,name,city,address_location,distance_from_kaaba,distance_from_nabawi,stars',
        ])
            ->where('is_popular', true)
            ->where('is_active', true)
            ->whereDate('end_date', '>=', now())
            ->latest()
            ->take(4)
            ->get();
    }

    protected function testimonials()
    {
        return Testimonial::where('is_active', true)
            ->latest()
            // ->take(6)
            ->get();
    }
}
