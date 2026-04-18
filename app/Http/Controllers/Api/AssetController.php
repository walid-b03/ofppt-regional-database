<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;
use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AssetController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Asset::class);

        $assets = Asset::forUser($request->user())->get();

        return response()->json([
            'message' => 'Biens récupérés avec succès.',
            'payload' => AssetResource::collection($assets),
        ], 200);
    }

    public function show(Asset $asset)
    {
        $this->authorize('view', $asset);

        $asset->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Bien récupéré avec succès.',
            'payload' => new AssetResource($asset),
        ], 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Asset::class);

        $asset = Asset::create($request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:assets,code'],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'in:Actif,Inactif,Endommagé,Perdu'],
            'description' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]));

        $asset->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Bien créé avec succès.',
            'payload' => new AssetResource($asset),
        ], 201);
    }

    public function update(Request $request, Asset $asset)
    {
        $this->authorize('update', $asset);

        $asset->update($request->validate([
            'code' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('assets')->ignore($asset->id)],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'in:Actif,Inactif,Endommagé,Perdu'],
            'description' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]));

        $asset->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Bien mis à jour avec succès.',
            'payload' => new AssetResource($asset),
        ], 200);
    }
}
