<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
     public function index(Request $request)
    {
          $search = $request->input('search');

        $messages = ContactMessage::query()
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%")
                                     ->orWhere('email', 'like', "%{$search}%")
                                     ->orWhere('subject', 'like', "%{$search}%"))
            ->latest()
            ->paginate(9)
            ->withQueryString();
        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
            'filters' => $request->only(['search']),
        ]);
    }
    
    public function show(ContactMessage $message)
    {

        return response()->json($message);
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();
        return back()->with('success', 'تم حذف الرسالة');
    }
}
