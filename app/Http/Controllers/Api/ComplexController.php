<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComplexResource;
use App\Models\Complex;
use Illuminate\Http\Request;

class ComplexController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Complex::class);

        $complexes = Complex::forHead($request->user())->get();

        return response()->json([
            'message' => 'Complexes récupérés avec succès.',
            'payload' => ComplexResource::collection($complexes),
        ], 200);
    }

    public function show(Request $request, Complex $complex)
    {
        $this->authorize('view', $complex);

        $complex->load(['head:id,code,first_name,last_name,establishment_id', 'region:id,code,name,head_id']);

        return response()->json([
            'message' => 'Complexe récupéré avec succès.',
            'payload' => new ComplexResource($complex),
        ], 200);
    }
}
