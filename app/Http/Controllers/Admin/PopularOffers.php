<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PopularOffers extends Controller
{
    //
    public function index(Request $request)
    {
        $offers = Offer::with([
            'governorates',
            'tripType',
            'company',
            'hotels',
            'features',
            'images',
            'mainImage'
        ])
            ->where('is_popular', true)
            ->when($request->status === 'expired', function ($q) {
                $q->whereDate('end_date', '<', now());
            })
            ->when($request->status === 'popular', function ($q) {
                $q->whereDate('end_date', '>=', now());
            })
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($sub) use ($request) {
                    $search = $request->search;
                    $sub->where('offer_code', 'like', "%{$search}%")
                        ->orWhere('title', 'like', "%{$search}%") ;
                });
            })

            ->latest()
            ->paginate(20)
            ->withQueryString();

        $counts = [
            'popular' => Offer::where('is_popular', true)
                ->whereDate('end_date', '>=', now())
                ->count(),

            'expired' => Offer::where('is_popular', true)
                ->whereDate('end_date', '<', now())
                ->count(),
        ];

        return Inertia::render('Admin/PopularOffers/Index', [
            'offers'  => $offers,
            'filters' => $request->only(['status', 'search']),
            'counts'  => $counts,
        ]);
    }


    public function toggleFlag(Offer $offer)
    {
        $offer->update([
            'is_popular' => false,
        ]);

        return back()->with('success', 'تم تحديث الحالة');
    }
}
