<?php

namespace App\Http\Controllers\Web;

use App\Events\DataSyncEvent;
use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RegionController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Region::class);

        return Inertia::render('Regions/Index', [
            'regions' => Region::forHead(auth()->user())->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Region::class);

        return Inertia::render('Regions/Create', [
            'availableHeads' => User::where('role', 'DRRG')->whereDoesntHave('headedRegion')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Region::class);

        $region = Region::create($request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:regions,code'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'head_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'DRRG')],
        ]));

        DataSyncEvent::dispatch($region, 'created');

        return redirect()->route('regions.index');
    }

    public function show(Region $region)
    {
        $this->authorize('view', $region);

        return Inertia::render('Regions/Show', [
            'region' => $region->load(['head:id,code,first_name,last_name,establishment_id']),
        ]);
    }

    public function edit(Region $region)
    {
        $this->authorize('update', $region);

        $availableHeads = User::where('role', 'DRRG')->where(
            function ($query) use ($region) {
                $query->whereDoesntHave('headedRegion')->orWhere('id', $region->head_id);
            }
        )->get();

        return Inertia::render('Regions/Edit', [
            'region' => $region->load(['head:id,code,first_name,last_name,establishment_id']),
            'availableHeads' => $availableHeads,
        ]);
    }

    public function update(Request $request, Region $region)
    {
        $this->authorize('update', $region);

        $region->update($request->validate([
            'code' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('regions')->ignore($region->id)],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'head_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'DRRG')],
        ]));

        DataSyncEvent::dispatch($region, 'updated');

        return redirect()->route('regions.index');
    }

    public function destroy(Region $region)
    {
        $this->authorize('forceDelete', $region);

        $region->forceDelete();

        DataSyncEvent::dispatch($region, 'deleted');

        return back();
    }
}
