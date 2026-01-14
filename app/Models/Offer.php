<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Offer extends Model
{
    
    protected $fillable = [
        'offer_code','title','slug',
        'governorate_id','trip_type_id','company_id',
        'duration_days','price','airline','hotel_id','program',
        
        'tour_level','is_special_offer','is_featured','is_popular','is_active',
        'start_date','end_date','available_places',
        'whatsapp_number',
        'seo_title','seo_description',
    ];

    protected $casts = [
        'is_special_offer' => 'boolean',
        'is_featured'      => 'boolean',
        'is_popular'       => 'boolean',
        'is_active'        => 'boolean',
        'start_date'       => 'date',
        'end_date'         => 'date',
    ];

    /* ================= Relations ================= */

    public function governorate()
    {
        return $this->belongsTo(Governorate::class);
    }

    public function tripType()
    {
        return $this->belongsTo(TripType::class);
    }

    public function company()
    {
        return $this->belongsTo(TourCompany::class);
    }

    public function images()
    {
        return $this->hasMany(OfferImage::class);
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class);
    }
    public function hotel()
{
    return $this->belongsTo(Hotel::class);
}


    /* ================= Query Scopes ================= */

    public function scopeActive(Builder $query)
    {
        return $query->where('is_active', true);
    }

    public function scopeAvailable(Builder $query)
    {
        return $query->where('available_places', '>', 0)
                     ->whereDate('start_date', '>=', now());
    }

    public function scopeSpecial(Builder $query)
    {
        return $query->where('is_special_offer', true);
    }

    /* ================= Accessors ================= */

    public function getTourLevelLabelAttribute()
    {
        return match ($this->tour_level) {
            'economical' => 'اقتصادي',
            'standard'   => 'متوسط',
            'luxury'     => 'فاخر',
            'vip'        => 'VIP',
            default      => '',
        };
    }
}
