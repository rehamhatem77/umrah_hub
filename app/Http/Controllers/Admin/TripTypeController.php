<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TripType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TripTypeController extends Controller
{
    public function index(Request $request)
    {

        $query = TripType::query();
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        $tripTypes = $query->latest()->paginate(20)->withQueryString();
        $offers_count = TripType::withCount('offers')->get()->keyBy('id');
        return Inertia::render('Admin/TripTypes/Index', [
            'tripTypes' => $tripTypes,
            'filters' => [
                'search' => $request->search ?? '',
                'offers_count' => $offers_count,
            ],
        ]);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate(['name' => 'required']);
            $data['slug'] = Str::slug($data['name']);

            TripType::create($data);
            return back()->with('success', 'تم إضافة نوع الرحلة');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة نوع الرحلة');
        }
    }

    public function update(Request $request, TripType $tripType)
    {
        $data = $request->validate(['name' => 'required']);
        $data['slug'] = Str::slug($data['name']);
        try {
            $tripType->update($data);
            return back()->with('success', 'تم تحديث نوع الرحلة');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث نوع الرحلة');
        }
    }

    public function destroy(TripType $tripType)
    {
        try {
            if ($tripType->offers()->exists()) {
                return redirect()
                    ->route('trip-types.index')->refresh()
                    ->with('error', 'لا يمكن حذف نوع الرحلة لأنها مرتبطة بعروض سفر.');
            }
            $tripType->delete();
            return back()->with('success', 'تم حذف نوع الرحلة');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف نوع الرحلة');
        }
    }
}
