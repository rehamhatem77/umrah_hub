<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TripType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TripTypeController extends Controller
{
     public function index()
    {
        $tripTypes = TripType::latest()->paginate(20);
        return view('admin.trip-types.index', compact('tripTypes'));
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name'=>'required']);
        $data['slug'] = Str::slug($data['name']);

        TripType::create($data);
        return back()->with('success','Trip type added');
    }

    public function update(Request $request, TripType $tripType)
    {
        $data = $request->validate(['name'=>'required']);
        $data['slug'] = Str::slug($data['name']);

        $tripType->update($data);
        return back()->with('success','Trip type updated');
    }

    public function destroy(TripType $tripType)
    {
        $tripType->delete();
        return back()->with('success','Trip type deleted');
    }
}
