<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HotelRequest;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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


        $data['slug'] = Str::slug($data['name']);

        try {
            if (Hotel::withTrashed()->where('name', $data['name'])->exists()) {
                return back()->with('error', 'يوجد فندق بنفس الاسم، يرجى اختيار اسم مختلف');
            }
             if ($request->hasFile('image')) {
                $data['image_path'] = $request->file('image')
                    ->store('hotels', 'public');
            }
            

            Hotel::create($data);

            return redirect()
                ->route('hotels.create')
                ->with('success', 'تم إضافة الفندق بنجاح');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة الفندق');
        }
    }

    private function generateUniqueSlug(string $name): string
    {
        $slug = Str::slug($name);
        // $originalSlug = $slug;
        // $counter = 1;

        // while (Hotel::withTrashed()->where('slug', $slug)->exists()) {
        //     $slug = $originalSlug . '-' . $counter;
        //     $counter++;
        // }

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
        try {

         $data = $request->validated();

            if ($request->hasFile('image')) {
                if ($hotel->image_path) {
                    Storage::disk('public')->delete($hotel->image_path);
                }

                $data['image_path'] = $request->file('image')
                    ->store('hotels', 'public');
            }
             $hotel->update($data);

            return redirect()
                ->route('hotels.index')
                ->with('success', 'تم تعديل بيانات الفندق بنجاح');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء تعديل بيانات الفندق');
        }
    }


    public function destroy(Request $request, $id)
    {
        try {
            $hotel = Hotel::withTrashed()->findOrFail($id);

            if ($hotel->offers()->exists()) {
                return redirect()
                    ->route('hotels.index')
                    ->with('error', 'لا يمكن حذف الفندق لأنه مرتبط بعروض سفر.');
            }

            if ($request->boolean('force')) {
                 if ($hotel->image_path) {
                    Storage::disk('public')->delete($hotel->image_path);
                }
                $hotel->forceDelete();

                return redirect()
                    ->route('hotels.trash')
                    ->with('success', 'تم حذف الفندق نهائيًا');
            }

            $hotel->delete();

            return redirect()
                ->route('hotels.index')
                ->with('success', 'تم نقل الفندق إلى سلة المحذوفات');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف الفندق');
        }
    }


    public function show($id)
    {
        $hotel = Hotel::withTrashed()->findOrFail($id);

        return response()->json($hotel);
    }


    public function restore($id)
    {
        try {
            $hotel = Hotel::withTrashed()->findOrFail($id);
            $hotel->restore();

            return back()->with('success', 'تم استعادة الفندق بنجاح');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء استعادة الفندق');
        }
    }
}
