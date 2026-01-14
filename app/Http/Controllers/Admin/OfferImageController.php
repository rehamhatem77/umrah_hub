<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\OfferImage;
use Illuminate\Http\Request;

class OfferImageController extends Controller
{
     public function store(Request $request, Offer $offer)
    {
        $request->validate([
            'image'=>'required|image|max:2048'
        ]);

        $path = $request->file('image')->store('offers','public');

        OfferImage::create([
            'offer_id' => $offer->id,
            'image_path' => $path,
            'is_main' => $request->boolean('is_main'),
        ]);

        return back()->with('success','Image uploaded');
    }

    public function destroy(OfferImage $image)
    {
        $image->delete();
        return back()->with('success','Image removed');
    }
}
