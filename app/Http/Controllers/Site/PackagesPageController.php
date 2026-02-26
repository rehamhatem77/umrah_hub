<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Governorate;
use App\Models\Offer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PackagesPageController extends Controller
{


    private array $tourLevelMap = [
        'economical' => 'اقتصادي',
        'standard'   => 'متوسط',
        'vip'        => 'VIP',
        'luxury'     => 'فاخر',
    ];

    public function index(Request $request)
    {
        try {
            $filter = $request->query('filter', '');


            $allPricesQuery = Offer::active()->whereDate('end_date', '>=', now());
            $minPriceDb = $allPricesQuery->min('price') ?? 0;
            $maxPriceDb = $allPricesQuery->max('price') ?? 10000;


            $priceFrom = (int) $request->query('price_from', 0);
            $priceTo   = (int) $request->query('price_to', $maxPriceDb);


            if ($priceTo > $maxPriceDb) {
                $priceTo = $maxPriceDb;
            }

            $offersQuery = Offer::query()
                ->active()
                ->whereDate('end_date', '>=', now())
                ->with([
                    'hotels:id,name,city,stars',
                    'images:id,offer_id,image_path,is_main,sort_order',
                    'mainImage:id,offer_id,image_path',
                    'company:id,company_code',
                    'tripType:id,name',
                    'features:id,name,icon',
                    'governorates:id,name',
                ])
                ->whereBetween('price', [$priceFrom, $priceTo]);


            if ($request->filled('date')) {
                $offersQuery->whereDate('start_date', '>=', $request->date);
            }

            if ($request->filled('month')) {

                $month = (int) $request->month;


                $offersQuery->where(function ($query) use ($month) {
                    $selectedDate = Carbon::create(now()->year, $month, 1);

                    $query->whereMonth('start_date', '=', $selectedDate);
                        // ->whereMonth('end_date', '>=', $selectedDate);
                });
            }
            if ($request->filled('level')) {
                $offersQuery->where('tour_level', $request->level);
            }


            if ($request->filled('durations')) {
                $offersQuery->whereIn(
                    'duration_days',
                    $this->mapDurations($request->durations)
                );
            }


            $cityMap = [
                'مكة' => 'مكة',
                'المدينة' => 'المدينة المنورة',
                'المدينة المنورة' => 'المدينة المنورة',
            ];
            if ($request->filled('destination')) {
                $city = $cityMap[$request->destination] ?? $request->destination;
                $offersQuery->whereHas('hotels', function ($q) use ($city) {
                    $q->where('city', $city);
                });
            }


            if ($request->filled('stars')) {
                $offersQuery->whereHas('hotels', function ($q) use ($request) {
                    $q->whereIn('stars', $request->stars);
                });
            }


            if ($request->filled('governorate_id')) {
                $offersQuery->whereHas('governorates', function ($q) use ($request) {
                    $q->where('governorates.id', (int) $request->governorate_id);
                });
            }



            $offers = $offersQuery->paginate(6)->through(function ($offer) {
                $offer->loadMissing('hotels');
                $offer->loadMissing('governorates');
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
                    'rating' => $offer->rating,
                    'image' => $offer->main_image_url,
                    'locations' => $offer->locations,
                    'tour_level' => $this->tourLevelMap[$offer->tour_level] ?? $offer->tour_level,
                    'number_of_rating_customers' => $offer->number_of_rating_customers,
                    'average_hotel_rating' => $offer->average_hotel_rating,
                    'hotels' => $offer->hotels->map(fn($hotel) => [
                        'id' => $hotel->id,
                        'name' => $hotel->name,
                        'city' => $hotel->city,
                        'stars' => $hotel->stars,
                    ])->values(),
                    'governorates' => $offer->governorates->map(fn($gov) => [
                        'id' => $gov->id,
                        'name' => $gov->name,
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

            $allGovernorates = Governorate::select('id', 'name')->get();

            return Inertia::render('Packages', [
                'offers' => $offers,
                'currentFilter' => $filter,
                'governorates' => $allGovernorates,
                'priceRange' => [
                    'min' => $minPriceDb,
                    'max' => $maxPriceDb,
                ],
                'durationCounts' => [
                    '7' => $durationCounts[7] ?? 0,
                    '10' => $durationCounts[10] ?? 0,
                    '14' => $durationCounts[14] ?? 0,
                ],
            ]);
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء تحميل الباقات: ' . $e->getMessage());
        }
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
                'hotels:id,desc,image_path,name,city,stars,distance_from_kaaba,distance_from_nabawi,address_location,features',
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
                'prices' => $offer->prices,
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
                'tour_level' => $this->tourLevelMap[$offer->tour_level] ?? $offer->tour_level,
                'program' => $offer->program,
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
            ],
            'meta' => [
                'title' => "Umrah Hub - {$offer->title}",
                'description' => $offer->desc ?? $offer->title,
                'image' => asset($offer->main_image_url),
                'url' => url()->current(),
            ]
        ]);
    }
}
