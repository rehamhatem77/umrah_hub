<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
      public function index()
    {
        $features = Feature::latest()->paginate(20);
        return view('admin.features.index', compact('features'));
    }

    public function store(Request $request)
    {
        $request->validate(['name'=>'required']);
        Feature::create($request->only('name'));
        return back()->with('success','Feature added');
    }

    public function destroy(Feature $feature)
    {
        $feature->delete();
        return back()->with('success','Feature deleted');
    }
}
