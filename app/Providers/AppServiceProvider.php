<?php

namespace App\Providers;

use App\Models\Offer;
use App\Observers\OfferObserver;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Offer::observe(OfferObserver::class);


      Inertia::share([
        'auth' => fn () => [
            'user' => Auth::user(),
        ],
    ]);
        Vite::prefetch(concurrency: 3);
    }
}
