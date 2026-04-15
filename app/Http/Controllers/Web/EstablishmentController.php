<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Complex;
use App\Models\Establishment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Establishments/Index', [
            'establishments' => Establishment::forHead(auth()->user())->with(['complex', 'head'])->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Establishment::class);

        return Inertia::render('Establishments/Create', [
            'availableComplexes' => Complex::forHead(auth()->user())->get(),
            'availableHeads'     => User::where('role', 'DRPD')->whereDoesntHave('headedEstablishment')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Establishment::class);

        Establishment::create($request->validate([
            'code'          => ['required', 'string', 'max:255', 'unique:establishments,code'],
            'name'          => ['required', 'string', 'max:255'],
            'sector'        => ['nullable', 'string', 'max:255'],
            'type'          => ['nullable', 'string', 'max:255'],
            'email'         => ['nullable', 'email', 'max:255'],
            'phone'         => ['nullable', 'string', 'max:255'],
            'address'       => ['nullable', 'string', 'max:255'],
            'complex_id'    => ['required', 'exists:complexes,id'],
            'head_id'       => ['nullable', Rule::exists('users')->where('role', 'DRPD')],
        ]));

        return redirect()->action([EstablishmentController::class, 'index']);
    }

    public function show(Establishment $establishment)
    {
        $this->authorize('view', $establishment);

        return Inertia::render('Establishments/Show', [
            'establishment' => $establishment->load(['complex', 'head', 'users', 'rooms', 'assets', 'trainings']),
        ]);
    }

    public function edit(Establishment $establishment)
    {
        $this->authorize('update', $establishment);

        $availableHeads = User::where('role', 'DRPD')->where(
            function($query) use ($establishment) {
                $query->whereDoesntHave('headedEstablishment')->orWhere('id', $establishment->head_id);
            }
        )->get();

        return Inertia::render('Establishments/Edit', [
            'establishment'    => $establishment->load(['complex', 'head']),
            'availableComplexes' => Complex::forHead(auth()->user())->get(),
            'availableHeads'   => $availableHeads,
        ]);
    }

    public function update(Request $request, Establishment $establishment)
    {
        $this->authorize('update', $establishment);

        $establishment->update($request->validate([
            'code'         => ['sometimes', 'required', 'string', 'max:255', Rule::unique('establishments')->ignore($establishment->id)],
            'name'         => ['sometimes', 'required', 'string', 'max:255'],
            'sector'       => ['nullable', 'string', 'max:255'],
            'type'         => ['nullable', 'string', 'max:255'],
            'email'        => ['nullable', 'email', 'max:255'],
            'phone'        => ['nullable', 'string', 'max:255'],
            'address'      => ['nullable', 'string', 'max:255'],
            'complex_id'   => ['sometimes', 'required', 'exists:complexes,id'],
            'head_id'      => ['nullable', Rule::exists('users')->where('role', 'DRPD')],
        ]));

        return redirect()->action([EstablishmentController::class, 'index']);
    }

    public function destroy(Establishment $establishment)
    {
        $this->authorize('delete', $establishment);

        $establishment->delete();

        return back();
    }
}
