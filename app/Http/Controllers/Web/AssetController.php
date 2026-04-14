<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Establishment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $assets = Asset::forUser($user)
            ->with(['establishment:id,code,name'])
            ->get();

        return Inertia::render('Assets/Index', [
            'assets' => $assets,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        $establishments = match (true) {
            $user->isAdmin() => Establishment::all(),
            $user->isDRRG()  => Establishment::whereHas('complex', fn($q) => $q->where('region_id', $user->headedRegion->id))->get(),
            $user->isDRCX()  => Establishment::where('complex_id', $user->headedComplex->id)->get(),
            $user->isDRPD() || $user->isAGAD() => collect([$user->headedEstablishment]),
            default          => collect(),
        };

        return Inertia::render('Assets/Create', [
            'establishments' => $establishments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'             => ['required', 'string', 'max:255', 'unique:assets,code'],
            'name'             => ['required', 'string', 'max:255'],
            'type'             => ['nullable', 'string', 'max:255'],
            'state'            => ['nullable', 'in:Actif,Inactif,Endommagé,Perdu'],
            'description'      => ['nullable', 'string'],
            'notes'            => ['nullable', 'string'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]);

        Asset::create($validated);

        return redirect()->route(str_replace('.store', '.index', Route::currentRouteName()));
    }

    public function show(Asset $asset)
    {
        $this->authorize('view', $asset);

        $asset->load(['establishment:id,code,name']);

        return Inertia::render('Assets/Show', [
            'asset' => $asset,
        ]);
    }

    public function edit(Asset $asset)
    {
        $this->authorize('update', $asset);

        $user = Auth::user();

        $establishments = match (true) {
            $user->isAdmin() => Establishment::all(),
            $user->isDRRG()  => Establishment::whereHas('complex', fn($q) => $q->where('region_id', $user->headedRegion->id))->get(),
            $user->isDRCX()  => Establishment::where('complex_id', $user->headedComplex->id)->get(),
            $user->isDRPD() || $user->isAGAD() => collect([$user->headedEstablishment]),
            default          => collect(),
        };

        $asset->load(['establishment:id,code,name']);

        return Inertia::render('Assets/Edit', [
            'asset' => $asset,
            'establishments' => $establishments,
        ]);
    }

    public function update(Request $request, Asset $asset)
    {
        $this->authorize('update', $asset);

        $validated = $request->validate([
            'code'             => ['sometimes', 'required', 'string', 'max:255', 'unique:assets,code,'.$asset->id],
            'name'             => ['sometimes', 'required', 'string', 'max:255'],
            'type'             => ['nullable', 'string', 'max:255'],
            'state'            => ['nullable', 'in:Actif,Inactif,Endommagé,Perdu'],
            'description'      => ['nullable', 'string'],
            'notes'            => ['nullable', 'string'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]);

        $asset->update($validated);

        return redirect()->route(str_replace('.update', '.index', Route::currentRouteName()));
    }

    public function destroy(Asset $asset)
    {
        $this->authorize('delete', $asset);

        $asset->delete();

        return back();
    }
}
