<?php

namespace App\Http\Controllers\SIte;

use App\Http\Controllers\Controller;
use App\Models\AdminAboutUsPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    //
     public function index()
    {
     
        $aboutUs = AdminAboutUsPage::first();

     
        return Inertia::render('About', [
            'aboutUs' => $aboutUs
        ]);
    }
}
