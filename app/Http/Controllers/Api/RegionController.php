<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegionResource;
use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Region::class);

        $regions = Region::forHead($request->user())->get();

        return response()->json([
            'message' => 'Régions récupérées avec succès.',
            'payload' => RegionResource::collection($regions),
        ], 200);
    }

    public function show(Request $request, Region $region)
    {
        $this->authorize('view', $region);

        $region->load(['head:id,code,first_name,last_name,establishment_id']);

        return response()->json([
            'message' => 'Région récupérée avec succès.',
            'payload' => new RegionResource($region),
        ], 200);
    }
}
