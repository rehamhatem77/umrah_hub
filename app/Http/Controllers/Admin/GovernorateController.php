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

        Governorate::create($data);

        return back()->with('success','تم إضافة المحافظة بنجاح');
    }

    public function update(Request $request, Governorate $governorate)
    {
        $data = $request->validate([
            'name' => 'required|string|in:' . implode(',', $this->egyptGovernorates),
        ]);

        $data['slug'] = Str::slug($data['name']);

        $governorate->update($data);

        return back();
    }

    public function destroy(Governorate $governorate)
    {
        $governorate->delete();
        return back();
    }
}
