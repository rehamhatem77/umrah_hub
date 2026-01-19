<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeatureOffer extends Model
{
      use SoftDeletes;
    protected $fillable = [
        'offer_id',
        'feature_id',
    ];

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
