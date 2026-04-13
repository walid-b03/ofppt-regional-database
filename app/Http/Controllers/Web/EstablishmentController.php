<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Complex;
use App\Models\Establishment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $establishments = Establishment::forHead($user)
            ->with(['complex:id,code,name', 'head:id,code,first_name,last_name'])
            ->get();

        return Inertia::render('Establishments/Index', [
            'establishments' => $establishments,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        $complexes = match (true) {
            $user->isAdmin() => Complex::all(),
            $user->isDRRG()  => Complex::where('region_id', $user->headedRegion->id)->get(),
            $user->isDRCX()  => Complex::where('id', $user->headedComplex->id)->get(),
            default          => collect(),
        };

        $users = User::where('role', 'DRPD')
            ->with('headedEstablishment')
            ->get();

        return Inertia::render('Establishments/Create', [
            'complexes' => $complexes,
            'availableHeads' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'         => ['required', 'string', 'max:255', 'unique:establishments,code'],
            'name'         => ['required', 'string', 'max:255'],
            'sector'       => ['nullable', 'string', 'max:255'],
            'type'         => ['nullable', 'string', 'max:255'],
            'email'        => ['nullable', 'email', 'max:255'],
            'phone'        => ['nullable', 'string', 'max:255'],
            'address'      => ['nullable', 'string', 'max:255'],
            'complex_id'   => ['required', 'exists:complexes,id'],
            'head_id'      => ['nullable', 'exists:users,id'],
        ]);

        Establishment::create($validated);

        return back();
    }

    public function show(Establishment $establishment)
    {
        $this->authorize('view', $establishment);

        $establishment->load([
            'complex:id,code,name,region_id',
            'head:id,code,first_name,last_name',
            'users:id,code,first_name,last_name,role,establishment_id',
        ]);

        return Inertia::render('Establishments/Show', [
            'establishment' => $establishment,
        ]);
    }

    public function edit(Establishment $establishment)
    {
        $this->authorize('update', $establishment);

        $user = Auth::user();

        $complexes = match (true) {
            $user->isAdmin() => Complex::all(),
            $user->isDRRG()  => Complex::where('region_id', $user->headedRegion->id)->get(),
            $user->isDRCX()  => Complex::where('id', $user->headedComplex->id)->get(),
            default          => collect(),
        };

        $users = User::where('role', 'DRPD')
            ->with('headedEstablishment')
            ->get();

        $establishment->load(['complex:id,code,name', 'head:id,code,first_name,last_name']);

        return Inertia::render('Establishments/Edit', [
            'establishment' => $establishment,
            'complexes' => $complexes,
            'availableHeads' => $users,
        ]);
    }

    public function update(Request $request, Establishment $establishment)
    {
        $this->authorize('update', $establishment);

        $validated = $request->validate([
            'code'         => ['sometimes', 'required', 'string', 'max:255', 'unique:establishments,code,'.$establishment->id],
            'name'         => ['sometimes', 'required', 'string', 'max:255'],
            'sector'       => ['nullable', 'string', 'max:255'],
            'type'         => ['nullable', 'string', 'max:255'],
            'email'        => ['nullable', 'email', 'max:255'],
            'phone'        => ['nullable', 'string', 'max:255'],
            'address'      => ['nullable', 'string', 'max:255'],
            'complex_id'   => ['sometimes', 'required', 'exists:complexes,id'],
            'head_id'      => ['nullable', 'exists:users,id'],
        ]);

        $establishment->update($validated);

        return back();
    }

    public function destroy(Establishment $establishment)
    {
        $this->authorize('delete', $establishment);

        $establishment->delete();

        return back();
    }
}
