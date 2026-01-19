<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOfferRequest;
use App\Http\Requests\Admin\UpdateOfferRequest;
use App\Models\Feature;
use App\Models\Governorate;
use App\Models\Hotel;
use App\Models\Offer;
use App\Models\OfferImage;
use App\Models\TourCompany;
use App\Models\TripType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OfferController extends Controller
{
    // public function index(Request $request)
    // {
    //     $offers = Offer::with(['governorates', 'tripType', 'company', 'hotels', 'features', 'images'])
    //         ->when($request->governorate_id, fn ($q) =>
    //             $q->where('governorate_id', $request->governorate_id)
    //         )
    //         ->when($request->trip_type_id, fn ($q) =>
    //             $q->where('trip_type_id', $request->trip_type_id)
    //         )
    //         ->when($request->status && $request->status !== 'all', fn ($q) =>
    //             $q->where('is_active', $request->status === 'active')
    //         )
    //         ->when($request->search, fn ($q) =>
    //             $q->where(function ($sub) use ($request) {
    //                 $sub->where('offer_code', 'like', "%{$request->search}%")
    //                     ->orWhereHas('governorate', fn ($g) =>
    //                         $g->where('name', 'like', "%{$request->search}%")
    //                     );
    //             })
    //         )
    //         ->latest()
    //         ->paginate(20)
    //         ->withQueryString();

    //     return Inertia::render('Admin/Offers/Index', [
    //         'offers'       => $offers,
    //         'filters'      => $request->only([
    //             'governorate_id',
    //             'trip_type_id',
    //             'status',
    //             'search'
    //         ]),
    //         'governorates' => Governorate::select('id', 'name')->get(),
    //         'tripTypes'    => TripType::select('id', 'name')->get(),
    //         'images'       => OfferImage::all(),
    //         'features'     => Feature::all(),
    //         'companies'    => TourCompany::select('id', 'name')->get(),
    //         'hotels'       => Hotel::select('id', 'name')->get(),


    //     ]);
    // }

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
            ->when(
                $request->governorate_id,
                fn($q) =>
                $q->whereHas(
                    'governorates',
                    fn($g) =>
                    $g->where('governorates.id', $request->governorate_id)
                )
            )->when(
                $request->hotel_id,
                fn($q) =>
                $q->whereHas(
                    'hotels',
                    fn($g) =>
                    $g->where('hotels.id', $request->hotel_id)
                )
            )->when(
                $request->company_id,
                fn($q) =>
                $q->where('company_id', $request->company_id)
            )
            ->when(
                $request->trip_type_id,
                fn($q) =>
                $q->where('trip_type_id', $request->trip_type_id)
            )
            // ->when(
            //     $request->status && $request->status !== 'all',
            //     fn($q) =>
            //     $q->where('is_active', $request->status === 'active')
            // )
            ->when($request->status, function ($q) use ($request) {

                if ($request->status === 'active') {
                    $q->where('is_active', true)
                        ->whereDate('end_date', '>=', now());
                } elseif ($request->status === 'inactive') {
                    $q->where('is_active', false);
                } elseif ($request->status === 'expired') {
                    $q->whereDate('end_date', '<', now());
                }
            })


            ->when(
                $request->search,
                fn($q) =>
                $q->where(function ($sub) use ($request) {
                    $sub->where('offer_code', 'like', "%{$request->search}%")
                        ->orWhereHas(
                            'governorates',
                            fn($g) =>
                            $g->where('name', 'like', "%{$request->search}%")
                        );
                })
            )
            ->latest()
            ->paginate(20)
            ->withQueryString();
$counts = [
    'all' => Offer::count(),
    'active' => Offer::where('is_active', true)->count(),
    'inactive' => Offer::where('is_active', false)->count(),
    'expired' => Offer::whereDate('end_date', '<', now())->count(),
];
        return Inertia::render('Admin/Offers/Index', [
            'offers'       => $offers,
            'filters'      => $request->only(['governorate_id', 'trip_type_id', 'company_id', 'hotel_id', 'status', 'search']),
            'governorates' => Governorate::select('id', 'name')->get(),
            'tripTypes'    => TripType::select('id', 'name')->get(),
            'companies'    => TourCompany::select('id', 'name')->get(),
            'hotels'       => Hotel::select('id', 'name')->get(),
            'features'     => Feature::all(),
            'counts'       => $counts,
        ]);
    }


    public function create()
    {
        return Inertia::render('Admin/Offers/Create', [
            'governorates' => Governorate::all(),
            'tripTypes'    => TripType::all(),
            'companies'    => TourCompany::all(),
            'hotels'       => Hotel::all(),
            'features'     => Feature::all(),


        ]);
    }

    public function store(StoreOfferRequest $request)
    {
       

        try {
             $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['title']);

        $offer = Offer::create($data);

        $offer->features()->sync($request->features ?? []);
        $offer->governorates()->sync($request->governorates ?? []);
        $offer->hotels()->sync($request->hotels ?? []);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('offers', 'public');

                $offer->images()->create([
                    'image_path' => $path,
                    'is_main'    => $index === ($request->is_main_image ?? 0),
                    'sort_order' => $index,
                ]);
            }
        }

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'حدث خطأ أثناء إنشاء الباقة: ' ]);
        }

        return redirect()
            ->route('admin.offers.index')
            ->with('success', 'تم إنشاء الباقة بنجاح');
    }

    public function edit(Offer $offer)
    {
        $offer->load('features', 'images', 'governorates', 'hotels');

        return Inertia::render('Admin/Offers/Edit', [
            'offer'        => $offer,
            'governorates' => Governorate::all(),
            'tripTypes'    => TripType::all(),
            'companies'    => TourCompany::all(),
            'hotels'       => Hotel::all(),
            'features'     => Feature::all(),
            'images'       => $offer->images()->orderBy('sort_order')->get(),
        ]);
    }

    public function update(UpdateOfferRequest $request, Offer $offer)
    {
       

        try {
             $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['title']);

        $offer->update($data);
        $offer->features()->sync($request->features ?? []);
        $offer->governorates()->sync($request->governorates ?? []);
        $offer->hotels()->sync($request->hotels ?? []);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('offers', 'public');

                $offer->images()->create([
                    'image_path' => $path,
                    'is_main'    => false,
                    'sort_order' => $offer->images()->count() + $index,
                ]);
            }
        }
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'حدث خطأ أثناء تحديث الباقة: ' ]);
        }

        return redirect()
            ->route('admin.offers.index')
            ->with('success', 'تم تحديث الباقة بنجاح');
    }

    public function destroy(Offer $offer)
    {

        $offer->images()->delete(); 
    
        $offer->delete();  

        return redirect()
            ->route('admin.offers.index')
            ->with('success','تم نقل الباقة إلى سلة المهملات');
    }

    public function toggleFlag(Request $request, Offer $offer)
    {
        $request->validate([
            'flag' => 'required|in:is_active,is_special_offer,is_featured,is_popular'
        ]);

        $flag = $request->flag;

        $offer->update([
            $flag => ! $offer->$flag
        ]);

        return back()->with('success', 'تم تحديث الحالة');
    }

    private function generateUniqueSlug(string $title): string
    {
        $slug  = Str::slug($title);
        $count = Offer::where('slug', 'like', "{$slug}%")->count();

        return $count ? "{$slug}-" . ($count + 1) : $slug;
    }

    public function deleteImage(OfferImage $image)
    {
        
        $image->delete();

        return back()->with('success', 'تم حذف الصورة');
    }

    public function toggleMainImage(OfferImage $image)
    {
        $offer = $image->offer;

        $offer->images()->update(['is_main' => false]);
        $image->update(['is_main' => true]);

        return back()->with('success', 'تم تعيين الصورة الرئيسية');
    }

    public function reorderImages(Request $request, Offer $offer)
    {
        foreach ($request->order as $sortOrder => $id) {
            $offer->images()
                ->where('id', $id)
                ->update(['sort_order' => $sortOrder]);
        }

        return response()->json(['success' => true]);
    }

   public function show($id)
{
    $offer = Offer::withTrashed()
        ->with([
            'governorates',
            'hotels',
            'tripType',
            'company',
            'features',
            'images' => fn ($q) => $q->withTrashed(),
        ])
        ->findOrFail($id);

    return Inertia::render('Admin/Offers/Show', [
        'offer' => $offer,
    ]);
}





public function trash(Request $request)
{
    $offers = Offer::onlyTrashed()
    ->with([
        'governorates',
        'tripType',
        'company',
        'hotels',
        'features',
        'images' => fn ($q) => $q->withTrashed(),
    ])
        ->when($request->search, function($q) use ($request) {
            $q->where('title', 'like', "%{$request->search}%")
              ->orWhere('offer_code', 'like', "%{$request->search}%");
        })
        ->paginate(12)
        ->withQueryString();

    return Inertia::render('Admin/Offers/Trash', [
        'offers' => $offers,
    ]);
}

public function restore($id)
{
    $offer = Offer::onlyTrashed()->findOrFail($id);

    $offer->restore();
    $offer->images()->withTrashed()->restore();

    return redirect()
        ->route('admin.offers.trash')
        ->with('success', 'تم استعادة الباقة بنجاح');
}


public function forceDelete($id)
{
    $offer = Offer::onlyTrashed()
        ->with([
            'images' => fn ($q) => $q->withTrashed(),
            'features',
            'governorates',
            'hotels',
        ])
        ->findOrFail($id);

    foreach ($offer->images as $image) {
        Storage::disk('public')->delete($image->image_path);
        $image->forceDelete();
    }

    $offer->features()->detach();
    $offer->governorates()->detach();
    $offer->hotels()->detach();

    $offer->forceDelete();

    return redirect()
        ->route('admin.offers.trash')
        ->with('success', 'تم حذف الباقة نهائياً');
}




}
