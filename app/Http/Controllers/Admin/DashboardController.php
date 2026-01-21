<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Governorate;
use App\Models\Hotel;
use App\Models\Offer;
use App\Models\Testimonial;
use App\Models\TourCompany;
use App\Models\TripType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //

public function index()
{
    $totalOffers = Offer::count();

    $activeOffers = Offer::where('is_active', true)
        ->whereDate('end_date', '>=', now())
        ->count();

    $expiredOffers = Offer::whereDate('end_date', '<', now())->count();

    return Inertia::render('Dashboard', [

        'kpis' => [
            'offers' => [
                'total' => $totalOffers,
                'active' => $activeOffers,
                'inactive' => Offer::where('is_active', false)->count(),
                'expired' => $expiredOffers,
                'special' => Offer::where('is_special_offer', true)->count(),
                'popular' => Offer::where('is_popular', true)->count(),
            ],

            'entities' => [
                'companies' => TourCompany::count(),
                'hotels' => Hotel::count(),
                'tripTypes' => TripType::count(),
                'governorates' => Governorate::count(),
            ],
        ],

        'lifecycle' => [
            'expiringSoon' => Offer::whereBetween('end_date', [now(), now()->addDays(7)])
                ->count(),

            'avgDuration' => round(
                Offer::selectRaw('AVG(DATEDIFF(end_date, start_date)) as avg')
                    ->value('avg')
            ),
        ],

        'latestOffers' => Offer::latest()->take(6)->get(),

        'expiringOffers' => Offer::whereBetween('end_date', [now(), now()->addDays(7)])
            ->take(6)->get(),

        'offersByTripType' => TripType::withCount('offers')->get(),
        'offersByCompany' => TourCompany::withCount('offers')
            ->orderByDesc('offers_count')
            ->take(5)
            ->get(),

        'offersByGovernorate' => Governorate::withCount('offers')
            ->orderByDesc('offers_count')
            ->take(5)
            ->get(),
    ]);
}



    public function users(Request $request)
    {
        $search = $request->input('search');

        $users = User::when($search, fn($q) => $q->where('name', 'like', "%{$search}%")
                                                ->orWhere('email', 'like', "%{$search}%"))
                     ->orderBy('created_at', 'desc')
                     ->paginate(10)
                     ->withQueryString();

        return Inertia::render('Admin/Settings/Index', [
            'users' => $users,
            'filters' => $request->only('search'),
        ]);
    }

    public function addUserAdmin(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $data['role'] = 'admin';
        $data['password'] = Hash::make($data['password']);

        

        User::create($data);
        return redirect()->back()->with('success', 'تمت إضافة المستخدم بنجاح');
    }

    // public function updateUser(Request $request, User $user)
    // {
    //     $data = $request->validate([
    //         'name' => 'sometimes|required|string|max:255',
    //         'role' => 'sometimes|required|in:user,admin',
    //     ]);

    //     $user->update($data);

    //     return redirect()->back()->with('success', 'تم تحديث بيانات المستخدم');
    // }
    public function deleteUser(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'تم حذف المستخدم');
    }

}
