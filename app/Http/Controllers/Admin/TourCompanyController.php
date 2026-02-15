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
        $query = TourCompany::whereNull('deleted_at');

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // if ($request->governorate_id) {
        //     $query->where('governorate_id', $request->governorate_id);
        // }
        if ($request->governorate_id) {
            $query->whereJsonContains('governorate_ids', (int) $request->governorate_id);
        }
        $companies = $query->latest()->paginate(10)->withQueryString();

        $allGovernorates = Governorate::select('id', 'name')->get();

        $companies->getCollection()->transform(function ($company) {
            $company->governorates_list = $company->governorates->map(fn($g) => ['id' => $g->id, 'name' => $g->name]);
            return $company;
        });

        return Inertia::render('Admin/TourCompanies/Index', [
            'companies' => $companies,
            'governorates' => $allGovernorates,
            'filters' => [
                'search' => $request->search ?? '',
                'governorate_id' => $request->governorate_id ?? '',
            ],
        ]);
    }

    public function store(StoreTourCompanyRequest $request)
    {
        try {
            TourCompany::create($request->validated());
            return back()->with('success', 'تم إضافة شركة جديدة بنجاح');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء إضافة شركة جديدة');
        }
    }

    public function update(UpdateTourCompanyRequest $request, TourCompany $tourCompany)
    {
        try {
            $tourCompany->update($request->validated());
            return back()->with('success', 'تم تحديث بيانات الشركة بنجاح');
        } catch (\Throwable $e) {
            return back()->with('errpr', 'حدث خطأ أثناء تحديث بيانات الشركة');
        }
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
        try {
            $company = TourCompany::withTrashed()->findOrFail($id);

            //  if ($company->offers()->count() > 0) {
            //     return back()->withErrors(['error' => 'لا يمكن حذف الشركة لأنها مرتبطة بعروض سفر.']);
            // }
            if ($request->boolean('force')) {
                if ($company->offers()->count() > 0) {
                    return redirect()->route('tour-companies.index')->with(['error' => 'لا يمكن حذف الشركة لأنها مرتبطة بعروض سفر.']);
                }
                $company->forceDelete();
                return back()->with('success', 'تم حذف الشركة نهائياً');
            }
            if ($company->offers()->count() > 0) {
                return back()->with(['error' => 'لا يمكن حذف الشركة لأنها مرتبطة بعروض سفر.']);
            }

            $company->delete();
            return back()->with('success', 'تم حذف الشركة بنجاح');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء حذف الشركة');
        }
    }


    public function trash(Request $request)
    {
        $query = TourCompany::onlyTrashed();

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->governorate_id) {
            $query->whereJsonContains('governorate_ids', (int) $request->governorate_id);
        }
        $companies = $query->latest()->paginate(10)->withQueryString();

        $allGovernorates = Governorate::select('id', 'name')->get();

        $companies->getCollection()->transform(function ($company) {
            $company->governorates_list = $company->governorates->map(fn($g) => ['id' => $g->id, 'name' => $g->name]);
            return $company;
        });


        return Inertia::render('Admin/TourCompanies/Trash', [
            'companies' => $companies->toArray(),
            'governorates' => $allGovernorates,
            'filters' => [
                'search' => $request->search ?? '',
                'governorate_id' => $request->governorate_id ?? '',
            ],
        ]);
    }
    public function show($id)
    {
        $company = TourCompany::withTrashed()->findOrFail($id);

        $governorates = $company->governorates->map(fn($g) => ['id' => $g->id, 'name' => $g->name]);
        return response()->json($company);
    }


    public function restore($id)
    {
        try {
            $company = TourCompany::onlyTrashed()->findOrFail($id);
            $company->restore();

            return back()->with('success', 'تم استعادة الشركة بنجاح');
        } catch (\Throwable $e) {
            return back()->with('error', 'حدث خطأ أثناء استعادة الشركة ');
        }
    }
}
