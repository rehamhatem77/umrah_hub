<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{

    public function index(Request $request)
    {
        $services = Service::when($request->search, fn ($q) =>
                $q->where('name', 'like', "%{$request->search}%")
            )
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
            'filters'  => $request->only('search'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:services,name',
            'description' => 'required|string|max:255|unique:services,description',
            'icon' => 'required|string:services,icon',
        ]);

        try {
        Service::create([
            'name' => $request->name,
            'description' => $request->description,
            'icon' => $request->icon,
        ]);

        return back()->with('success', 'تمت إضافة الخدمة بنجاح');

    } catch (\Throwable $e) {
        return back()->with('error', 'حدث خطأ أثناء إضافة الخدمة');
    }
    }

    public function update(Request $request, Service $service)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:services,name,' . $service->id,
            'description' => 'required|string|max:255|unique:services,description,' . $service->id,
            'icon' => 'required|string:services,icon'.$service->id,
        ]);
        try{

        $service->update([
            'name' => $request->name,
            'description' => $request->description,
            'icon' => $request->icon,
          
        ]);

        return back()->with('success', 'تم تحديث الخدمة بنجاح');
        }
        catch (\Throwable $e) {
        return back()->with('error', 'حدث خطأ أثناء تحديث الخدمة');
    }
    }

   public function destroy(Service $service)
{
    try {
    
        $service->delete();

        return back()->with('success', 'تم حذف الخدمة');

    } catch (\Throwable $e) {
        return back()->with('error', 'حدث خطأ أثناء حذف الخدمة');
    }


}

}
