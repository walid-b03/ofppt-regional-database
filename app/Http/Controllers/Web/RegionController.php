<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegionController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $regions = Region::forHead($user)
            ->with('head:id,code,first_name,last_name')
            ->get();

        return Inertia::render('Regions/Index', [
            'regions' => $regions,
        ]);
    }

    public function create()
    {
        $users = User::where('role', 'DRRG')
            ->with('headedRegion')
            ->get();

        return Inertia::render('Regions/Create', [
            'availableHeads' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'     => ['required', 'string', 'max:255', 'unique:regions,code'],
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['nullable', 'email', 'max:255'],
            'phone'    => ['nullable', 'string', 'max:255'],
            'head_id'  => ['nullable', 'exists:users,id'],
        ]);

        Region::create($validated);

        return back();
    }

    public function show(Region $region)
    {
        $this->authorize('view', $region);

        $region->load(['head:id,code,first_name,last_name', 'complexes:id,code,name,region_id']);

        return Inertia::render('Regions/Show', [
            'region' => $region,
        ]);
    }

    public function edit(Region $region)
    {
        $this->authorize('update', $region);

        $users = User::where('role', 'DRRG')
            ->with('headedRegion')
            ->get();

        $region->load('head:id,code,first_name,last_name');

        return Inertia::render('Regions/Edit', [
            'region' => $region,
            'availableHeads' => $users,
        ]);
    }

    public function update(Request $request, Region $region)
    {
        $this->authorize('update', $region);

        $validated = $request->validate([
            'code'     => ['sometimes', 'required', 'string', 'max:255', 'unique:regions,code,'.$region->id],
            'name'     => ['sometimes', 'required', 'string', 'max:255'],
            'email'    => ['nullable', 'email', 'max:255'],
            'phone'    => ['nullable', 'string', 'max:255'],
            'head_id'  => ['nullable', 'exists:users,id'],
        ]);

        $region->update($validated);

        return back();
    }

    public function destroy(Region $region)
    {
        $this->authorize('delete', $region);

        $region->delete();

        return back();
    }
}
