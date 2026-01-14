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
    public function index(Request $request)
    {
        $offers = Offer::with(['governorate', 'tripType', 'company', 'hotel'])
            ->when($request->governorate_id, fn ($q) =>
                $q->where('governorate_id', $request->governorate_id)
            )
            ->when($request->trip_type_id, fn ($q) =>
                $q->where('trip_type_id', $request->trip_type_id)
            )
            ->when($request->status && $request->status !== 'all', fn ($q) =>
                $q->where('is_active', $request->status === 'active')
            )
            ->when($request->search, fn ($q) =>
                $q->where(function ($sub) use ($request) {
                    $sub->where('offer_code', 'like', "%{$request->search}%")
                        ->orWhereHas('governorate', fn ($g) =>
                            $g->where('name', 'like', "%{$request->search}%")
                        );
                })
            )
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Offers/Index', [
            'offers'       => $offers,
            'filters'      => $request->only([
                'governorate_id',
                'trip_type_id',
                'status',
                'search'
            ]),
            'governorates' => Governorate::select('id', 'name')->get(),
            'tripTypes'    => TripType::select('id', 'name')->get(),
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
        $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['title']);

        $offer = Offer::create($data);

        $offer->features()->sync($request->features ?? []);

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

        return redirect()
            ->route('admin.offers.index')
            ->with('success', 'تم إنشاء العرض بنجاح');
    }

    public function edit(Offer $offer)
    {
        $offer->load('features', 'images');

        return Inertia::render('Admin/Offers/Edit', [
            'offer'        => $offer,
            'governorates' => Governorate::all(),
            'tripTypes'    => TripType::all(),
            'companies'    => TourCompany::all(),
            'hotels'       => Hotel::all(),
            'features'     => Feature::all(),
        ]);
    }

    public function update(UpdateOfferRequest $request, Offer $offer)
    {
        $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['title']);

        $offer->update($data);
        $offer->features()->sync($request->features ?? []);

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

        return redirect()
            ->route('admin.offers.index')
            ->with('success', 'تم تحديث العرض بنجاح');
    }

    public function destroy(Offer $offer)
    {
        $offer->delete();

        return redirect()
            ->route('admin.offers.index')
            ->with('success', 'تم حذف العرض');
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
        Storage::disk('public')->delete($image->image_path);
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
}
