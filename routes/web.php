<?php

use App\Http\Controllers\Admin\AboutUsPageController;
use App\Http\Controllers\Admin\AdminHomePageController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\ContactPagecontroller;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FeatureController;
use App\Http\Controllers\Admin\GovernorateController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\TourCompanyController;
use App\Http\Controllers\Admin\HotelController;
use App\Http\Controllers\Admin\PopularOffers;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SpecialOffer;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TripTypeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SIte\AboutUsController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\FooterController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\OfferSearchController;
use App\Http\Controllers\Site\PackagesPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutUsController::class, 'index'])->name('about');
Route::get('/contact',[ContactController::class,'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');


Route::get('/packages', [PackagesPageController::class, 'index'])->name('packages');

Route::get('/packages/{slug}', [PackagesPageController::class, 'show'])->name('packages.show');
Route::get('/search', [OfferSearchController::class, 'search'])->name('packages.search');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth','admin.only')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

     Route::get('/users', [DashboardController::class, 'users'])->name('users.index');
    Route::post('/users', [DashboardController::class, 'addUserAdmin'])->name('users.store');
    Route::put('/users/{user}', [DashboardController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{user}', [DashboardController::class, 'deleteUser'])->name('users.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});


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

        Route::get('trash', [OfferController::class, 'trash'])->name('trash');
        Route::put('{id}/restore', [OfferController::class, 'restore'])->name('restore');
        Route::delete('{id}/force-delete', [OfferController::class, 'forceDelete'])->name('forceDelete');
        Route::get('show/{offer}', [OfferController::class, 'show'])->name('show');


        Route::get('/search', [OfferController::class, 'search'])
    ->name('search');


        Route::delete('images/{image}', [OfferController::class, 'deleteImage'])
            ->name('images.delete');
        Route::patch('images/{image}/main', [OfferController::class, 'toggleMainImage'])
            ->name('images.main');
        Route::post('{offer}/images/reorder', [OfferController::class, 'reorderImages'])
            ->name('images.reorder');
    });

     Route::prefix('admin/special-offers')->name('admin.special-offers.')->group(function () {
        Route::get('/', [SpecialOffer::class, 'index'])->name('index');
        Route::patch('/{offer}/toggle-special', [SpecialOffer::class, 'toggleFlag'])
    ->name('toggle-flag');


    });
     Route::prefix('admin/popular-offers')->name('admin.popular-offers.')->group(function () {
        Route::get('/', [PopularOffers::class, 'index'])->name('index');
         Route::patch('/{offer}/toggle-popular', [PopularOffers::class, 'toggleFlag'])
    ->name('popular-flag');


    });

    Route::prefix('admin')->group(function () {
        Route::resource('governorates', GovernorateController::class);
        Route::resource('trip-types', TripTypeController::class);
        Route::resource('features', FeatureController::class);
         Route::resource('services', ServiceController::class);


        Route::get('/tour-companies', [TourCompanyController::class, 'index'])->name('tour-companies.index');
        Route::post('/tour-companies', [TourCompanyController::class, 'store'])->name('tour-companies.store');
        Route::put('/tour-companies/{tourCompany}', [TourCompanyController::class, 'update'])->name('tour-companies.update');
        Route::delete('/tour-companies/{tourCompany}', [TourCompanyController::class, 'destroy'])->name('tour-companies.destroy');

        Route::get('/tour-companies/trash', [TourCompanyController::class, 'trash'])->name('tour-companies.trash');
        Route::post('/tour-companies/{id}/restore', [TourCompanyController::class, 'restore'])->name('tour-companies.restore');

        Route::delete('/tour-companies/{id}/force-delete', [TourCompanyController::class, 'destroy'])
            ->name('tour-companies.destroyPermanent');
        Route::get('/tour-companies/{id}', [TourCompanyController::class, 'show'])->name('tour-companies.show');

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
        Route::post('/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
        Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');

        Route::get('/testimonials/trash', [TestimonialController::class, 'trash'])->name('testimonials.trash');
        Route::post('/testimonials/{id}/restore', [TestimonialController::class, 'restore'])->name('testimonials.restore');
        Route::get('/testimonials/{id}', [TestimonialController::class, 'show'])->name('testimonials.show');


    Route::get('/homepage', [AdminHomepageController::class, 'index'])->name('admin.homepage.index');
    Route::post('/homepage/hero', [AdminHomepageController::class, 'updateHero'])->name('admin.homepage.hero.update');
    Route::delete('/homepage/hero/image', [AdminHomepageController::class, 'deleteHeroImage'])->name('admin.homepage.hero.image.delete');
    Route::post('/homepage/services', [AdminHomepageController::class, 'updateServices'])->name('admin.homepage.services.update');
    Route::post('/homepage/special', [AdminHomepageController::class, 'updateSpecial'])->name('admin.homepage.special.update');
    Route::post('/homepage/packages', [AdminHomepageController::class, 'updatePackages'])->name('admin.homepage.packages.update');
    Route::post('/homepage/testimonials', [AdminHomepageController::class, 'updateTestimonials'])->name('admin.homepage.testimonials.update');


      Route::get('/about-us', [AboutUsPageController::class, 'index'])->name('about-us.index');
    Route::post('/about-us/{section}', [AboutUsPageController::class, 'updateSection'])->name('about-us.section.update');

     Route::get('/contact-us', [ContactPagecontroller::class, 'index'])->name('contact-us.index');
    Route::post('/contact-us/{section}', [ContactPageController::class, 'updateSection'])->name('contact-us.section.update');

        Route::get('/contact-messages', [ContactMessageController::class, 'index'])->name('contact-messages.index');
    Route::get('/contact-messages/{id}', [ContactMessageController::class, 'show'])->name('contact-messages.show');
    Route::delete('/contact-messages/{message}', [ContactMessageController::class, 'destroy'])->name('contact-messages.destroy');
    
  

    });
});


require __DIR__ . '/auth.php';
