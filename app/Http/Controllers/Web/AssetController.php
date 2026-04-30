<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Establishment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Asset::class);

        return Inertia::render('Assets/Index', [
            'assets' => Asset::forUser(auth()->user())->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Asset::class);

        return Inertia::render('Assets/Create', [
            'availableEstablishments' => Establishment::forHead(auth()->user())->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Asset::class);

        Asset::create($request->validate([
            'code'             => ['required', 'string', 'max:255', 'unique:assets,code'],
            'name'             => ['required', 'string', 'max:255'],
            'type'             => ['nullable', 'string', 'max:255'],
            'state'            => ['nullable', 'in:Actif,Inactif,Endommagé,Perdu'],
            'description'      => ['nullable', 'string'],
            'notes'            => ['nullable', 'string'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]));

        return redirect()->route('assets.index');
    }

    public function show(Asset $asset)
    {
        $this->authorize('view', $asset);

        return Inertia::render('Assets/Show', [
            'asset' => $asset->load(['establishment:id,code,name,head_id,complex_id']),
        ]);
    }

    public function edit(Asset $asset)
    {
        $this->authorize('update', $asset);

        return Inertia::render('Assets/Edit', [
            'asset' => $asset->load(['establishment:id,code,name,head_id,complex_id']),
            'availableEstablishments' => Establishment::forHead(auth()->user())->get(),
        ]);
    }

    public function update(Request $request, Asset $asset)
    {
        $this->authorize('update', $asset);

        $asset->update($request->validate([
            'code'             => ['sometimes', 'required', 'string', 'max:255', Rule::unique('assets')->ignore($asset->id)],
            'name'             => ['sometimes', 'required', 'string', 'max:255'],
            'type'             => ['nullable', 'string', 'max:255'],
            'state'            => ['nullable', 'in:Actif,Inactif,Endommagé,Perdu'],
            'description'      => ['nullable', 'string'],
            'notes'            => ['nullable', 'string'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]));

        return redirect()->route('assets.index');
    }

    public function destroy(Asset $asset)
    {
        $this->authorize('forceDelete', $asset);

        $asset->forceDelete();

        return redirect()->route('assets.index');
    }
}
