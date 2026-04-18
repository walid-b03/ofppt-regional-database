<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Establishment;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TrainingController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Training::class);

        return Inertia::render('Trainings/Index', [
            'trainings' => Training::forUser(auth()->user())->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Training::class);

        return Inertia::render('Trainings/Create', [
            'availableEstablishments' => Establishment::forHead(auth()->user())->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Training::class);

        Training::create($request->validate([
            'code'             => ['required', 'string', 'max:255', 'unique:trainings,code'],
            'name'             => ['required', 'string', 'max:255'],
            'type'             => ['nullable', 'in:Diplomante,Qualifiante'],
            'level'            => ['nullable', 'in:Qualification,Spécialisation,Technicien,Technicien Spécialisé'],
            'is_trunk'         => ['nullable', 'boolean'],
            'duration'         => ['nullable', 'integer', 'min:0'],
            'description'      => ['nullable', 'string'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]));

        return redirect()->action([TrainingController::class, 'index']);
    }

    public function show(Training $training)
    {
        $this->authorize('view', $training);

        return Inertia::render('Trainings/Show', [
            'training' => $training->load(['establishment:id,code,name,head_id,complex_id']),
        ]);
    }

    public function edit(Training $training)
    {
        $this->authorize('update', $training);

        return Inertia::render('Trainings/Edit', [
            'training' => $training->load(['establishment:id,code,name,head_id,complex_id']),
            'availableEstablishments' => Establishment::forHead(auth()->user())->get(),
        ]);
    }

    public function update(Request $request, Training $training)
    {
        $this->authorize('update', $training);

        $training->update($request->validate([
            'code'             => ['sometimes', 'required', 'string', 'max:255', Rule::unique('trainings')->ignore($training->id)],
            'name'             => ['sometimes', 'required', 'string', 'max:255'],
            'type'             => ['nullable', 'in:Diplomante,Qualifiante'],
            'level'            => ['nullable', 'in:Qualification,Spécialisation,Technicien,Technicien Spécialisé'],
            'is_trunk'         => ['nullable', 'boolean'],
            'duration'         => ['nullable', 'integer', 'min:0'],
            'description'      => ['nullable', 'string'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]));

        return redirect()->action([TrainingController::class, 'index']);
    }

    public function destroy(Training $training)
    {
        $this->authorize('delete', $training);

        $training->delete();

        return back();
    }
}
