<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Complex;
use App\Models\Region;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ComplexController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $complexes = Complex::forHead($user)
            ->with(['region:id,code,name', 'head:id,code,first_name,last_name'])
            ->get();

        return Inertia::render('Complexes/Index', [
            'complexes' => $complexes,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        $regions = $user->isAdmin()
            ? Region::all()
            : Region::where('id', $user->headedRegion->id)->get();

        $users = User::where('role', 'DRCX')
            ->with('headedComplex')
            ->get();

        return Inertia::render('Complexes/Create', [
            'regions' => $regions,
            'availableHeads' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'       => ['required', 'string', 'max:255', 'unique:complexes,code'],
            'name'       => ['required', 'string', 'max:255'],
            'email'      => ['nullable', 'email', 'max:255'],
            'phone'      => ['nullable', 'string', 'max:255'],
            'location'   => ['nullable', 'string', 'max:255'],
            'region_id'  => ['required', 'exists:regions,id'],
            'head_id'    => ['nullable', 'exists:users,id'],
        ]);

        Complex::create($validated);

        return back();
    }

    public function show(Complex $complex)
    {
        $this->authorize('view', $complex);

        $complex->load([
            'region:id,code,name',
            'head:id,code,first_name,last_name',
            'establishments:id,code,name,complex_id',
        ]);

        return Inertia::render('Complexes/Show', [
            'complex' => $complex,
        ]);
    }

    public function edit(Complex $complex)
    {
        $this->authorize('update', $complex);

        $user = Auth::user();

        $regions = $user->isAdmin()
            ? Region::all()
            : Region::where('id', $user->headedRegion->id)->get();

        $users = User::where('role', 'DRCX')
            ->with('headedComplex')
            ->get();

        $complex->load(['region:id,code,name', 'head:id,code,first_name,last_name']);

        return Inertia::render('Complexes/Edit', [
            'complex' => $complex,
            'regions' => $regions,
            'availableHeads' => $users,
        ]);
    }

    public function update(Request $request, Complex $complex)
    {
        $this->authorize('update', $complex);

        $validated = $request->validate([
            'code'       => ['sometimes', 'required', 'string', 'max:255', 'unique:complexes,code,'.$complex->id],
            'name'       => ['sometimes', 'required', 'string', 'max:255'],
            'email'      => ['nullable', 'email', 'max:255'],
            'phone'      => ['nullable', 'string', 'max:255'],
            'location'   => ['nullable', 'string', 'max:255'],
            'region_id'  => ['sometimes', 'required', 'exists:regions,id'],
            'head_id'    => ['nullable', 'exists:users,id'],
        ]);

        $complex->update($validated);

        return back();
    }

    public function destroy(Complex $complex)
    {
        $this->authorize('delete', $complex);

        $complex->delete();

        return back();
    }
}
