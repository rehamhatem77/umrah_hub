<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Governorate;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GovernorateController extends Controller
{
    /**
     * Static list of Egyptian governorates (Arabic)
     */
    private array $egyptGovernorates = [
        'القاهرة',
        'الجيزة',
        'الإسكندرية',
        'الدقهلية',
        'الشرقية',
        'المنوفية',
        'القليوبية',
        'الغربية',
        'كفر الشيخ',
        'البحيرة',
        'دمياط',
        'بورسعيد',
        'الإسماعيلية',
        'السويس',
        'شمال سيناء',
        'جنوب سيناء',
        'الفيوم',
        'بني سويف',
        'المنيا',
        'أسيوط',
        'سوهاج',
        'قنا',
        'الأقصر',
        'أسوان',
        'الوادي الجديد',
        'مطروح',
        'البحر الأحمر',
    ];

    public function index(Request $request)
    {
        $query = Governorate::query();
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Paginate results
        $governorates = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Governorates/Index', [
            'governorates' => $governorates,
            'egyptGovernorates' => $this->egyptGovernorates,
            'filters' => [
                'search' => $request->search ?? '',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|in:' . implode(',', $this->egyptGovernorates),
        ]);

        $data['slug'] = Str::slug($data['name']);

        try {
            Governorate::create($data);

            return back()->with('success', 'تم إضافة المحافظة بنجاح');
        } catch (\Throwable $e) {


            return back()->with('error', 'حدث خطأ أثناء إضافة المحافظة');
        }
    }

    // public function update(Request $request, Governorate $governorate)
    // {
    //     $data = $request->validate([
    //         'name' => 'required|string|in:' . implode(',', $this->egyptGovernorates),
    //     ]);

    //     $data['slug'] = Str::slug($data['name']);

    //     try {
    //         $governorate->update($data);

    //         return back()->with('success', 'تم تحديث المحافظة بنجاح');
    //     } catch (\Throwable $e) {


    //         return back()->with('error', 'حدث خطأ أثناء تحديث المحافظة');
    //     }
    // }

    public function destroy(Governorate $governorate)
    {
        try {
            if ($governorate->offers()->exists()) {
                return back()->with(
                    'error',
                    'لا يمكن حذف المحافظة لأنها مرتبطة بعروض سفر.'
                );
            }

            $governorate->delete();

            return back()->with('success', 'تم حذف المحافظة بنجاح');
        } catch (\Throwable $e) {


            return back()->with('error', 'حدث خطأ أثناء حذف المحافظة');
        }
    }
}
