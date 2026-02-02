<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\AdminContactPage;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    
      public function index()
    {
     
        $contactUs = AdminContactPage::first();

     
        return Inertia::render('Site/ContactUs/ContactUs', [
            'contactUs' => $contactUs
        ]);
    }


        public function store(Request $request)
    {
       
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:50',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

      
        ContactMessage::create($data);
        return redirect()
                ->route('contact')->with('success','تم إرسال رسالتك بنجاح');
    
    }
}
