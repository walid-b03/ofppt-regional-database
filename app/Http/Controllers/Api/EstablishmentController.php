<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EstablishmentResource;
use App\Models\Establishment;
use Illuminate\Http\Request;

class EstablishmentController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Establishment::class);

        $establishments = Establishment::forHead($request->user())->get();

        return response()->json([
            'message' => 'Établissements récupérés avec succès.',
            'payload' => EstablishmentResource::collection($establishments),
        ], 200);
    }

    public function show(Establishment $establishment)
    {
        $this->authorize('view', $establishment);

        $establishment->load([
            'head:id,code,first_name,last_name,establishment_id',
            'complex:id,code,name,head_id,region_id',
        ]);

        return response()->json([
            'message' => 'Établissement récupéré avec succès.',
            'payload' => new EstablishmentResource($establishment),
        ], 200);
    }
}
