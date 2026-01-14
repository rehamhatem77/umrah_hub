<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::latest()->paginate(20);
        return view('admin.testimonials.index', compact('testimonials'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name'=>'required',
            'rating'=>'required|integer|min:1|max:5',
            'comment'=>'required',
        ]);

        Testimonial::create($data);
        return back()->with('success','Testimonial added');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $testimonial->update($request->validate([
            'rating'=>'integer|min:1|max:5',
            'comment'=>'required',
            'is_active'=>'boolean'
        ]));

        return back()->with('success','Testimonial updated');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return back()->with('success','Testimonial deleted');
    }
}
