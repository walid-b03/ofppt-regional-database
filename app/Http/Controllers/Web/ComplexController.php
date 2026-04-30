<?php

namespace App\Http\Controllers\Web;

use App\Events\DataSyncEvent;
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
        $this->authorize('viewAny', Complex::class);

        return Inertia::render('Complexes/Index', [
            'complexes' => Complex::forHead(auth()->user())->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Complex::class);

        return Inertia::render('Complexes/Create', [
            'availableHeads' => User::where('role', 'DRCX')->whereDoesntHave('headedComplex')->get(),
            'availableRegions' => Region::forHead(auth()->user())->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Complex::class);

        $complex = Complex::create($request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:complexes,code'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'region_id' => ['required', 'exists:regions,id'],
            'head_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'DRCX')],
        ]));

        DataSyncEvent::dispatch($complex, 'created');

        return redirect()->route('complexes.index');
    }

    public function show(Complex $complex)
    {
        $this->authorize('view', $complex);

        return Inertia::render('Complexes/Show', [
            'complex' => $complex->load([
                'head:id,code,first_name,last_name,establishment_id',
                'region:id,code,name,head_id',
            ]),
        ]);
    }

    public function edit(Complex $complex)
    {
        $this->authorize('update', $complex);

        $availableHeads = User::where('role', 'DRCX')->where(
            function ($query) use ($complex) {
                $query->whereDoesntHave('headedComplex')->orWhere('id', $complex->head_id);
            }
        )->get();

        return Inertia::render('Complexes/Edit', [
            'availableHeads' => $availableHeads,
            'availableRegions' => Region::forHead(auth()->user())->get(),
            'complex' => $complex->load([
                'head:id,code,first_name,last_name,establishment_id',
                'region:id,code,name,head_id',
            ]),
        ]);
    }

    public function update(Request $request, Complex $complex)
    {
        $this->authorize('update', $complex);

        $complex->update($request->validate([
            'code' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('complexes')->ignore($complex->id)],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'region_id' => ['sometimes', 'required', 'exists:regions,id'],
            'head_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'DRCX')],
        ]));

        DataSyncEvent::dispatch($complex, 'updated');

        return redirect()->route('complexes.index');
    }

    public function destroy(Complex $complex)
    {
        $this->authorize('forceDelete', $complex);

        DataSyncEvent::dispatch($complex, 'deleted');

        $complex->forceDelete();

        return redirect()->route('complexes.index');
    }
}
