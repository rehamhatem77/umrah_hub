<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
          $query = Testimonial::query();
    if ($request->has('search') && $request->search) {
        $query->where('customer_name', 'like', '%' . $request->search . '%');
    }
        $testimonials = $query->latest()->paginate(20);
        return Inertia::render('Admin/Testimonials/Index', [
                'testimonials' => $testimonials,
                'filters' => [
                'search' => $request->search ?? '',
            ],
            ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Testimonials/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name'=>'required',
            'rating'=>'required|integer|min:1|max:5',
            'comment'=>'required',
            'is_active'=>'boolean'
        ]);

        Testimonial::create($data);
        return redirect()->route('testimonials.create')->with('success','تم إضافة التقييم');
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $testimonial->update($request->validate([
            'rating'=>'integer|min:1|max:5',
            'comment'=>'required',
            'is_active'=>'boolean',
            'customer_name'=>'required',
        ]));

        return redirect()->route('testimonials.index')->with('success','تم تحديث التقييم');
    }

    public function destroy($id, Request $request)
    {
        $testimonial = Testimonial::withTrashed()->findOrFail($id);
       if ($request->boolean('force')) {

        $testimonial->forceDelete();
        return back()->with('success', 'تم حذف التقييم نهائياً');
    }
    $testimonial->delete();
    return back()->with('success', 'تم حذف التقييم بنجاح');
    }


  public function show($id)
    {
        $testimonial = Testimonial::withTrashed()->findOrFail($id);

        return response()->json($testimonial);
    }


    public function trash(Request $request)
{
    $query = Testimonial::onlyTrashed();

    if ($request->search) {
        $query->where('customer_name', 'like', '%' . $request->search . '%');
    }

    $testimonials = $query->latest()->paginate(10)->withQueryString();

    return Inertia::render('Admin/Testimonials/Trash', [
        'testimonials' => $testimonials, 
        'filters' => [
            'search' => $request->search ?? '',
        ],
    ]);
}
    public function restore($id)
{
    $testimonial = Testimonial::onlyTrashed()->findOrFail($id);
    $testimonial->restore();

    return back()->with('success', 'تم استعادة التقييم بنجاح');
}
}
