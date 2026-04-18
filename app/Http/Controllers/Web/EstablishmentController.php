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
        $this->authorize('viewAny', Establishment::class);

        return Inertia::render('Establishments/Index', [
            'establishments' => Establishment::forHead(auth()->user())->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Establishment::class);

        return Inertia::render('Establishments/Create', [
            'availableHeads'     => User::where('role', 'DRPD')->whereDoesntHave('headedEstablishment')->get(),
            'availableComplexes' => Complex::forHead(auth()->user())->get(),
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
            'head_id'       => ['nullable', Rule::exists('users', 'id')->where('role', 'DRPD')],
        ]));

        return redirect()->action([EstablishmentController::class, 'index']);
    }

    public function show(Establishment $establishment)
    {
        $this->authorize('view', $establishment);

        return Inertia::render('Establishments/Show', [
            'establishment' => $establishment->load([
                'head:id,code,role,first_name,last_name,establishment_id',
                'complex:id,code,name,head_id,region_id',
            ]),
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
            'availableHeads'   => $availableHeads,
            'availableComplexes' => Complex::forHead(auth()->user())->get(),
            'establishment'    => $establishment->load([
                'head:id,code,role,first_name,last_name,establishment_id',
                'complex:id,code,name,head_id,region_id',
            ]),
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
            'head_id'      => ['nullable', Rule::exists('users', 'id')->where('role', 'DRPD')],
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
