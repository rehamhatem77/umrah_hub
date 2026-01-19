<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FeatureController extends Controller
{
    public function index(Request $request)
    {
        $features = Feature::when($request->search, fn ($q) =>
                $q->where('name', 'like', "%{$request->search}%")
            )
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Features/Index', [
            'features' => $features,
            'filters'  => $request->only('search'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:features,name',
            'icon' => 'nullable|string',
        ]);

        Feature::create([
            'name' => $request->name,
            'icon' => $request->icon,
           
        ]);

        return back()->with('success', 'تمت إضافة الميزة بنجاح');
    }

    public function update(Request $request, Feature $feature)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:features,name,' . $feature->id,
            'icon' => 'nullable|string',
        ]);

        $feature->update([
            'name' => $request->name,
            'icon' => $request->icon,
          
        ]);

        return back()->with('success', 'تم تحديث الميزة بنجاح');
    }

    public function destroy(Feature $feature)
    {
        $feature->delete();

        return back()->with('success', 'تم حذف الميزة');
    }
}
