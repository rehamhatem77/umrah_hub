<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTourCompanyRequest;
use App\Http\Requests\Admin\UpdateTourCompanyRequest;
use App\Models\Governorate;
use App\Models\TourCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourCompanyController extends Controller
{
    public function index(Request $request)
    {
        // $query = TourCompany::with(['governorate'])
        //     ->withCount('offers');
        $query = TourCompany::with(['governorate'])->whereNull('deleted_at');

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->governorate_id) {
            $query->where('governorate_id', $request->governorate_id);
        }

        return Inertia::render('Admin/TourCompanies/Index', [
            'companies' => $query->latest()->paginate(10)->withQueryString(),
            'governorates' => Governorate::select('id', 'name')->get(),
            'filters' => [
                'search' => $request->search ?? '',
                'governorate_id' => $request->governorate_id ?? '',
            ],
        ]);
    }

    public function store(StoreTourCompanyRequest $request)
    {
        TourCompany::create($request->validated());
        return back()->with('success', 'تم إضافة شركة جديدة بنجاح');
    }

    public function update(UpdateTourCompanyRequest $request, TourCompany $tourCompany)
    {
        $tourCompany->update($request->validated());
        return back()->with('success', 'تم تحديث بيانات الشركة بنجاح');
    }

    // public function destroy(TourCompany $tourCompany)
    // {
    //     // if ($tourCompany->offers()->exists()) {
    //     //     return back()->withErrors([
    //     //         'delete' => 'لا يمكن حذف شركة مرتبطة بعروض'
    //     //     ]);
    //     // }

    //     $tourCompany->delete();
    //     return back();
    // }

    public function destroy(Request $request, $id)
{
     $company = TourCompany::withTrashed()->findOrFail($id);
    if ($request->boolean('force')) {
        $company->forceDelete();
        return back()->with('success', 'تم حذف الشركة نهائياً');
    }

    // Soft delete
    $company->delete();
    return back()->with('success', 'تم حذف الشركة بنجاح');
}

//  soft-deleted companies
public function trash(Request $request)
{
    $query = TourCompany::onlyTrashed()->with('governorate');

    if ($request->search) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    $companies = $query->latest()->paginate(10)->withQueryString();

    return Inertia::render('Admin/TourCompanies/Trash', [
        'companies' => $companies->toArray(), 
        'filters' => [
            'search' => $request->search ?? '',
        ],
    ]);
}


// Restore a soft-deleted company
public function restore($id)
{
    $company = TourCompany::onlyTrashed()->findOrFail($id);
    $company->restore();

    return back()->with('success', 'تم استعادة الشركة بنجاح');
}



}
