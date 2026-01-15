<?php

use App\Http\Controllers\Admin\GovernorateController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\TourCompanyController;
use App\Http\Controllers\Admin\HotelController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TripTypeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//admin routes
Route::middleware(['auth', 'admin.only'])->group(function () {
    Route::prefix('admin/offers')->name('admin.offers.')->group(function () {


        Route::get('/', [OfferController::class, 'index'])->name('index');
        Route::get('create', [OfferController::class, 'create'])->name('create');
        Route::post('/', [OfferController::class, 'store'])->name('store');
        Route::get('{offer}/edit', [OfferController::class, 'edit'])->name('edit');
        Route::put('{offer}', [OfferController::class, 'update'])->name('update');
        Route::delete('{offer}', [OfferController::class, 'destroy'])->name('destroy');

        Route::patch('{offer}/toggle/{flag}', [OfferController::class, 'toggleFlag'])
            ->name('toggle-flag');


        Route::delete('images/{image}', [OfferController::class, 'deleteImage'])
            ->name('images.delete');
        Route::patch('images/{image}/main', [OfferController::class, 'toggleMainImage'])
            ->name('images.main');
        Route::post('{offer}/images/reorder', [OfferController::class, 'reorderImages'])
            ->name('images.reorder');
    });

    Route::prefix('admin')->group(function () {
        Route::resource('governorates', GovernorateController::class);
        Route::resource('trip-types', TripTypeController::class);


        Route::get('/tour-companies', [TourCompanyController::class, 'index'])->name('tour-companies.index');
        Route::post('/tour-companies', [TourCompanyController::class, 'store'])->name('tour-companies.store');
        Route::put('/tour-companies/{tourCompany}', [TourCompanyController::class, 'update'])->name('tour-companies.update');
        Route::delete('/tour-companies/{tourCompany}', [TourCompanyController::class, 'destroy'])->name('tour-companies.destroy');

        Route::get('/tour-companies/trash', [TourCompanyController::class, 'trash'])->name('tour-companies.trash');
        Route::post('/tour-companies/{id}/restore', [TourCompanyController::class, 'restore'])->name('tour-companies.restore');

        Route::delete('/tour-companies/{id}/force-delete', [TourCompanyController::class, 'destroy'])
            ->name('tour-companies.destroyPermanent');

        Route::get('/hotels', [HotelController::class, 'index'])->name('hotels.index');
        Route::get('/hotels/create', [HotelController::class, 'create'])->name('hotels.create');
        Route::post('/hotels', [HotelController::class, 'store'])->name('hotels.store');
        Route::get('/hotels/{hotel}/edit', [HotelController::class, 'edit'])->name('hotels.edit');
        Route::put('/hotels/{hotel}', [HotelController::class, 'update'])->name('hotels.update');
        Route::delete('/hotels/{hotel}', [HotelController::class, 'destroy'])->name('hotels.destroy');

        Route::get('/hotels/trash', [HotelController::class, 'trash'])->name('hotels.trash');
        Route::post('/hotels/{id}/restore', [HotelController::class, 'restore'])->name('hotels.restore');
        Route::get('/hotels/{hotel}', [HotelController::class, 'show'])->name('hotels.show');



        Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');
        Route::get('/testimonials/create', [TestimonialController::class, 'create'])->name('testimonials.create');
        Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
        Route::get('/testimonials/{testimonial}/edit', [TestimonialController::class, 'edit'])->name('testimonials.edit');
        Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
        Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');

        Route::get('/testimonials/trash', [TestimonialController::class, 'trash'])->name('testimonials.trash');
        Route::post('/testimonials/{id}/restore', [TestimonialController::class, 'restore'])->name('testimonials.restore');

        Route::get('/testimonials/{testimonial}', [TestimonialController::class, 'show'])->name('testimonials.show');
    });
});


require __DIR__ . '/auth.php';
