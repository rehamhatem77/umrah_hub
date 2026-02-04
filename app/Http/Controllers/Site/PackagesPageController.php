<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PackagesPageController extends Controller
{
    //
    public function index(Request $request)
    {
        $filter = $request->query('filter');

        $offersQuery = Offer::query()
            ->active()
            ->whereDate('end_date', '>=', now())
            ->with([
                'hotels:id,name,city,stars',
                'images:id,offer_id,image_path,is_main,sort_order',
                'mainImage:id,offer_id,image_path',
                'company:id',
                'tripType:id,name',
                'features:id,name,icon',
            ]);

        if ($request->filled(['price_from', 'price_to'])) {
            $offersQuery->whereBetween('price', [
                $request->price_from,
                $request->price_to
            ]);
        }
        if ($request->filled('date')) {
            $offersQuery->whereDate('start_date', '>=', $request->date);
        }
        if ($request->filled('durations')) {
            $offersQuery->whereIn(
                'duration_days',
                $this->mapDurations($request->durations)
            );
        }

        if ($request->filled('stars')) {
            $offersQuery->whereHas('hotels', function ($q) use ($request) {
                $q->whereIn('stars', $request->stars);
            });
        }


        // switch ($filter) {
        //     case 'special':
        //         $offersQuery->special();
        //         break;
        //     case 'popular':
        //         $offersQuery->popular();
        //         break;
        //     case 'cheapest':
        //         $offersQuery->cheapest();
        //         break;
        //     case 'nearest':
        //         $offersQuery->nearest();
        //         break;
        //     case 'ramadan':
        //         $offersQuery->ramadan();
        //         break;
        //     default:
        //         $offersQuery->latest();
        //         break;
        // }

        $offers = $offersQuery->paginate(6)->through(function ($offer) {
            $offer->loadMissing('hotels');
            return [
                'id' => $offer->id,
                'title' => $offer->title,
                'slug' => $offer->slug,
                'offer_code' => $offer->offer_code,
                'price' => $offer->price,
                'duration_days' => $offer->duration_days,
                'available_places' => $offer->available_places,
                'start_date' => $offer->start_date,
                'is_special_offer' => $offer->is_special_offer,
                'is_popular' => $offer->is_popular,
                'image' => $offer->main_image_url,
                'locations' => $offer->locations,
                "number_of_rating_customers" => $offer->number_of_rating_customers,
                'average_hotel_rating' => $offer->average_hotel_rating,
                'hotels' => $offer->hotels->map(fn($hotel) => [
                    'id' => $hotel->id,
                    'name' => $hotel->name,
                    'city' => $hotel->city,
                    'stars' => $hotel->stars,
                ])->values(),
                'company' => $offer->company,
                'trip_type' => $offer->tripType,
                'features' => $offer->features,

            ];
        });
        $durationCounts = Offer::active()
            ->whereDate('end_date', '>=', now())
            ->selectRaw('duration_days, COUNT(*) as count')
            ->groupBy('duration_days')
            ->pluck('count', 'duration_days');

        $minPrice = $offersQuery->min('price');
        $maxPrice = $offersQuery->max('price');

        return Inertia::render('Packages', [
            'offers' => $offers,
            'currentFilter' => $filter ?? '',
            'priceRange' => [
                'min' => $minPrice ?? 0,
                'max' => $maxPrice ?? 10000,
            ],
            'durationCounts' => [
                '7' => $durationCounts[7] ?? 0,
                '10' => $durationCounts[10] ?? 0,
                '14' => $durationCounts[14] ?? 0,
            ],
        ]);
    }

    private function mapDurations(array $durations): array
    {
        return collect($durations)
            ->flatMap(function ($d) {
                return match ($d) {
                    '7'  => [7],
                    '10'   => [10],
                    '14'  => [14],
                    default => [],
                };
            })
            ->unique()
            ->values()
            ->toArray();
    }

    public function show(string $slug)
    {
        $offer = Offer::active()
            ->whereDate('end_date', '>=', now())
            ->where('slug', $slug)
            ->with([
                'hotels:id,name,city,stars,distance_from_kaaba,distance_from_nabawi,address_location,features',
                'images:id,offer_id,image_path,is_main,sort_order',
                'mainImage:id,offer_id,image_path',
                'company:id,company_code',
                'tripType:id,name',
                'features:id,name,icon',
            ])
            ->firstOrFail();
            
       $averageHotelRating = $offer->hotels->avg('stars'); 

        return Inertia::render('PackageDetails', [
            'offer' => [
                'id' => $offer->id,
                'title' => $offer->title,
                'slug' => $offer->slug,
                'offer_code' => $offer->offer_code,
                'price' => $offer->price,
                'price_contain' => $offer->price_contain,
                'price_not_contain' => $offer->price_not_contain,
                'duration_days' => $offer->duration_days,
                'available_places' => $offer->available_places,
                'start_date' => $offer->start_date,
                'end_date' => $offer->end_date,
                'is_special_offer' => $offer->is_special_offer,
                'is_popular' => $offer->is_popular,
                'desc' => $offer->desc,
                'airline' => $offer->airline,
                'program' => $offer->program,
                'tour_level' => $offer->tour_level,
                'tour_level_label' => $offer->tour_level_label,
                'image' => $offer->main_image_url,
                'images' => $offer->images->map(fn($img) => [
                    'id' => $img->id,
                    'image_path' => $img->image_path,
                    'is_main' => $img->is_main,
                    'sort_order' => $img->sort_order,
                    'url' => Storage::url($img->image_path),
                ]),
                'locations' => $offer->locations,
                'number_of_rating_customers' => $offer->number_of_rating_customers,
                'rating' => $offer->rating,
                'average_hotel_rating' => $averageHotelRating,
                'hotels' => $offer->hotels,
                'company' => $offer->company,
                'trip_type' => $offer->tripType,
                'features' => $offer->features,
            ]
        ]);
    }
}
