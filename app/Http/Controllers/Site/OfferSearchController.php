<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;

class OfferSearchController extends Controller
{
    public function search(Request $request)
    {
        $q = $request->get('q');

        if (!$q) {
            return response()->json([]);
        }

        $offers = Offer::select('id', 'title', 'offer_code', 'slug')
            ->whereDate('end_date', '>=', now()) 
            ->where(function ($query) use ($q) {
                $query->where('offer_code', 'like', "%{$q}%")
                    ->orWhere('title', 'like', "%{$q}%");
            })
            ->limit(10)
            ->get();

        return response()->json($offers);
    }
}
