<?php

namespace App\Jobs;

use App\Models\Offer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;

class DeactivateExpiredOffers implements ShouldQueue
{
    use Queueable;
        use Dispatchable, InteractsWithQueue, SerializesModels;


    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //

        // Deactivate expired offers
          {
        Offer::where('is_active', true)
            ->whereDate('end_date', '<', Carbon::today())
            ->update(['is_active' => false]);
    }
    }
}
