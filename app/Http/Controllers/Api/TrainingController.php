<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TrainingResource;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TrainingController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Training::class);

        $trainings = Training::forUser($request->user())->get();

        return response()->json([
            'message' => 'Formations récupérées avec succès.',
            'payload' => TrainingResource::collection($trainings),
        ], 200);
    }

    public function show(Training $training)
    {
        $this->authorize('view', $training);

        $training->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Formation récupérée avec succès.',
            'payload' => new TrainingResource($training),
        ], 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Training::class);

        $training = Training::create($request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:trainings,code'],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'in:Diplomante,Qualifiante'],
            'level' => ['nullable', 'in:Qualification,Spécialisation,Technicien,Technicien Spécialisé'],
            'is_trunk' => ['nullable', 'boolean'],
            'duration' => ['nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]));

        $training->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Formation créée avec succès.',
            'payload' => new TrainingResource($training),
        ], 201);
    }

    public function update(Request $request, Training $training)
    {
        $this->authorize('update', $training);

        $training->update($request->validate([
            'code' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('trainings')->ignore($training->id)],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'type' => ['nullable', 'in:Diplomante,Qualifiante'],
            'level' => ['nullable', 'in:Qualification,Spécialisation,Technicien,Technicien Spécialisé'],
            'is_trunk' => ['nullable', 'boolean'],
            'duration' => ['nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]));

        $training->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Formation mise à jour avec succès.',
            'payload' => new TrainingResource($training),
        ], 200);
    }
}
