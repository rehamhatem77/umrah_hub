<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HotelRequest;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;



class HotelController extends Controller
{

    public function index(Request $request)
    {
        $query = Hotel::query()->whereNull('deleted_at');

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $hotels = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Hotels/Index', [
            'hotels' => $hotels,
            'filters' => $request->only('search'),
        ]);
    }

    public function trash(Request $request)
    {
        $query = Hotel::onlyTrashed();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $hotels = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Hotels/Trash', [
            'hotels' => $hotels,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Store a new hotel.
     */

    public function create()
    {
        return Inertia::render('Admin/Hotels/Create');
    }

    public function store(HotelRequest $request)
    {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug($data['name']);

        Hotel::create($data);

        return redirect()->route('hotels.create')
            ->with('success', 'تم إضافة الفندق بنجاح');
    }
    private function generateUniqueSlug(string $name): string
    {
        $slug = Str::slug($name);

        $originalSlug = $slug;
        $counter = 1;

        while (Hotel::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }





    public function edit(Hotel $hotel)
    {
        return Inertia::render('Admin/Hotels/Edit', [
            'hotel' => $hotel,
        ]);
    }

    public function update(HotelRequest $request, Hotel $hotel)
    {
        $hotel->update($request->validated());

        return redirect()->route('hotels.index')
            ->with('success', 'تم تعديل بيانات الفندق بنجاح');
    }


    public function destroy(Request $request, $id)
    {
        $hotel = Hotel::withTrashed()->findOrFail($id);

        if ($request->boolean('force')) {
            $hotel->forceDelete();

            return redirect()
                ->route('hotels.trash')
                ->with('success', 'تم حذف الفندق نهائيًا');
        }

        $hotel->delete();

        return redirect()
            ->route('hotels.index')
            ->with('success', 'تم نقل الفندق إلى سلة المحذوفات');
    }


    public function show($id)
    {
        $hotel = Hotel::withTrashed()->findOrFail($id);

        return response()->json($hotel);
    }


    public function restore($id)
    {
        $hotel = Hotel::withTrashed()->findOrFail($id);
        $hotel->restore();

        return redirect()->back()->with('success', 'تم استعادة الفندق بنجاح');
    }
}
