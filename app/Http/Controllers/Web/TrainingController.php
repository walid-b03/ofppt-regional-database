<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Establishment;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class TrainingController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $trainings = Training::forUser($user)
            ->with(['establishment:id,code,name'])
            ->get();

        return Inertia::render('Trainings/Index', [
            'trainings' => $trainings,
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

        return Inertia::render('Trainings/Create', [
            'establishments' => $establishments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'             => ['required', 'string', 'max:255', 'unique:trainings,code'],
            'name'             => ['required', 'string', 'max:255'],
            'type'             => ['nullable', 'in:Diplomante,Qualifiante'],
            'level'            => ['nullable', 'in:Qualification,Spécialisation,Technicien,Technicien Spécialisé'],
            'is_trunk'         => ['nullable', 'boolean'],
            'duration'         => ['nullable', 'integer', 'min:0'],
            'description'      => ['nullable', 'string'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]);

        Training::create($validated);

        return redirect()->route(str_replace('.store', '.index', Route::currentRouteName()));
    }

    public function show(Training $training)
    {
        $this->authorize('view', $training);

        $training->load(['establishment:id,code,name']);

        return Inertia::render('Trainings/Show', [
            'training' => $training,
        ]);
    }

    public function edit(Training $training)
    {
        $this->authorize('update', $training);

        $user = Auth::user();

        $establishments = match (true) {
            $user->isAdmin() => Establishment::all(),
            $user->isDRRG()  => Establishment::whereHas('complex', fn($q) => $q->where('region_id', $user->headedRegion->id))->get(),
            $user->isDRCX()  => Establishment::where('complex_id', $user->headedComplex->id)->get(),
            $user->isDRPD() || $user->isAGAD() => collect([$user->headedEstablishment]),
            default          => collect(),
        };

        $training->load(['establishment:id,code,name']);

        return Inertia::render('Trainings/Edit', [
            'training' => $training,
            'establishments' => $establishments,
        ]);
    }

    public function update(Request $request, Training $training)
    {
        $this->authorize('update', $training);

        $validated = $request->validate([
            'code'             => ['sometimes', 'required', 'string', 'max:255', 'unique:trainings,code,'.$training->id],
            'name'             => ['sometimes', 'required', 'string', 'max:255'],
            'type'             => ['nullable', 'in:Diplomante,Qualifiante'],
            'level'            => ['nullable', 'in:Qualification,Spécialisation,Technicien,Technicien Spécialisé'],
            'is_trunk'         => ['nullable', 'boolean'],
            'duration'         => ['nullable', 'integer', 'min:0'],
            'description'      => ['nullable', 'string'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]);

        $training->update($validated);

        return redirect()->route(str_replace('.update', '.index', Route::currentRouteName()));
    }

    public function destroy(Training $training)
    {
        $this->authorize('delete', $training);

        $training->delete();

        return back();
    }
}
