<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Complex;
use App\Models\Region;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ComplexController extends Controller
{
    public function index()
    {
        return Inertia::render('Complexes/Index', [
            'complexes' => Complex::forHead(auth()->user())->with(['region', 'head'])->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Complex::class);

        return Inertia::render('Complexes/Create', [
            'availableRegions' => Region::forHead(auth()->user())->get(),
            'availableHeads'   => User::where('role', 'DRCX')->whereDoesntHave('headedComplex')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Complex::class);

        Complex::create($request->validate([
            'code'      => ['required', 'string', 'max:255', 'unique:complexes,code'],
            'name'      => ['required', 'string', 'max:255'],
            'email'     => ['nullable', 'email', 'max:255'],
            'phone'     => ['nullable', 'string', 'max:255'],
            'city'      => ['nullable', 'string', 'max:255'],
            'region_id' => ['required', 'exists:regions,id'],
            'head_id'   => ['nullable', Rule::exists('users')->where('role', 'DRCX')],
        ]));

        return redirect()->action([ComplexController::class, 'index']);
    }

    public function show(Complex $complex)
    {
        $this->authorize('view', $complex);

        return Inertia::render('Complexes/Show', [
            'complex' => $complex->load(['region', 'head', 'establishments']),
        ]);
    }

    public function edit(Complex $complex)
    {
        $this->authorize('update', $complex);

        $availableHeads = User::where('role', 'DRCX')->where(
            function($query) use ($complex) {
                $query->whereDoesntHave('headedComplex')->orWhere('id', $complex->head_id);
            }
        )->get();

        return Inertia::render('Complexes/Edit', [
            'complex'          => $complex->load(['region', 'head']),
            'availableRegions' => Region::forHead(auth()->user())->get(),
            'availableHeads'   => $availableHeads,
        ]);
    }

    public function update(Request $request, Complex $complex)
    {
        $this->authorize('update', $complex);

        $complex->update($request->validate([
            'code'      => ['sometimes', 'required', 'string', 'max:255', Rule::unique('complexes')->ignore($complex->id)],
            'name'      => ['sometimes', 'required', 'string', 'max:255'],
            'email'     => ['nullable', 'email', 'max:255'],
            'phone'     => ['nullable', 'string', 'max:255'],
            'city'      => ['nullable', 'string', 'max:255'],
            'region_id' => ['sometimes', 'required', 'exists:regions,id'],
            'head_id'   => ['nullable', Rule::exists('users')->where('role', 'DRCX')],
        ]));

        return redirect()->action([ComplexController::class, 'index']);
    }

    public function destroy(Complex $complex)
    {
        $this->authorize('delete', $complex);

        $complex->delete();

        return back();
    }
}
