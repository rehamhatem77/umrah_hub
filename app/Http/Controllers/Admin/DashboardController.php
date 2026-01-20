<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Governorate;
use App\Models\Hotel;
use App\Models\Offer;
use App\Models\Testimonial;
use App\Models\TourCompany;
use App\Models\TripType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //

public function index()
{
    $totalOffers = Offer::count();

    $activeOffers = Offer::where('is_active', true)
        ->whereDate('end_date', '>=', now())
        ->count();

    $expiredOffers = Offer::whereDate('end_date', '<', now())->count();

    return Inertia::render('Dashboard', [

        /* ================= KPIs ================= */
        'kpis' => [
            'offers' => [
                'total' => $totalOffers,
                'active' => $activeOffers,
                'inactive' => Offer::where('is_active', false)->count(),
                'expired' => $expiredOffers,
                'special' => Offer::where('is_special_offer', true)->count(),
                'popular' => Offer::where('is_popular', true)->count(),
            ],

            'entities' => [
                'companies' => TourCompany::count(),
                'hotels' => Hotel::count(),
                'tripTypes' => TripType::count(),
                'governorates' => Governorate::count(),
            ],
        ],

        /* ================= Lifecycle ================= */
        'lifecycle' => [
            'expiringSoon' => Offer::whereBetween('end_date', [now(), now()->addDays(7)])
                ->count(),

            'avgDuration' => round(
                Offer::selectRaw('AVG(DATEDIFF(end_date, start_date)) as avg')
                    ->value('avg')
            ),
        ],

        /* ================= Lists ================= */
        'latestOffers' => Offer::latest()->take(6)->get(),

        'expiringOffers' => Offer::whereBetween('end_date', [now(), now()->addDays(7)])
            ->take(6)->get(),

        /* ================= Distribution ================= */
        'offersByTripType' => TripType::withCount('offers')->get(),
        'offersByCompany' => TourCompany::withCount('offers')
            ->orderByDesc('offers_count')
            ->take(5)
            ->get(),

        'offersByGovernorate' => Governorate::withCount('offers')
            ->orderByDesc('offers_count')
            ->take(5)
            ->get(),
    ]);
}


}
